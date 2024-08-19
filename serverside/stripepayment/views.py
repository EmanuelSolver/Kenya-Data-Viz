from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Payment, Coupon, Subscription
from .serializers import SubscriptionSerializer
from django.utils import timezone
import stripe
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from django.http import JsonResponse, HttpResponse
import uuid
from django.contrib.auth.models import User

stripe.api_key = settings.STRIPE_SECRET_KEY

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE', '')})

class ProcessPaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data

            # Validate data
            user_id = data.get('user_id')
            amount = data.get('amount', 10000)  # Default amount in cents (Ksh 100)
            if not user_id:
                return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if user exists
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)

            # Generate a unique order_id
            order_id = str(uuid.uuid4())

            # Create PaymentIntent
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='kes',  # Kenyan Shilling
                payment_method_types=['card'],
                metadata={"order_id": order_id},
            )

            # Save payment information in your Payment model
            payment = Payment.objects.create(
                user=user,
                amount=amount / 100,  # Convert back to shillings
                status=payment_intent['status'],
                order_id=order_id
            )
            
                        # Check if the user has an existing subscription
            subscription, created = Subscription.objects.get_or_create(user=user)

           
            # Update the subscription
            subscription.is_active = True
            subscription.start_date = timezone.now()
            subscription.end_date = timezone.now() + timezone.timedelta(days=30)  # Example: 30-day subscription
            subscription.save()

            # Send the client_secret to the client
            return JsonResponse({'client_secret': payment_intent['client_secret'], 'order_id': order_id})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class StripeWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

        try:
            # Verify webhook signature
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError:
            return HttpResponse(status=400)  # Invalid payload
        except stripe.error.SignatureVerificationError:
            return HttpResponse(status=400)  # Invalid signature

        # Handle the event
        event_type = event.get('type')
        payment_intent = event['data']['object']

        if event_type == 'payment_intent.succeeded':
            try:
                payment = Payment.objects.get(stripe_payment_intent_id=payment_intent['id'])
                payment.status = 'Succeeded'
                payment.save()

                # Optionally, activate the user's subscription
                subscription, created = Subscription.objects.get_or_create(user=payment.user)
                subscription.is_active = True
                subscription.save()

            except Payment.DoesNotExist:
                return HttpResponse(status=404)  # Payment not found

        elif event_type == 'payment_intent.payment_failed':
            try:
                payment = Payment.objects.get(stripe_payment_intent_id=payment_intent['id'])
                payment.status = 'Failed'
                payment.save()
            except Payment.DoesNotExist:
                return HttpResponse(status=404)  # Payment not found

        return JsonResponse({'status': 'success'}, status=200)


class CouponVerifyView(APIView):
    def post(self, request):
        data = request.data

        user_id = data.get('user_id')
        dis_code = data.get('code')

        # Validate user
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate coupon
        try:
            coupon = Coupon.objects.get(code=dis_code, valid_until__gte=timezone.now())
            
            # Update or create subscription
            subscription, created = Subscription.objects.get_or_create(user=user)
            subscription.is_active = True
            subscription.start_date = timezone.now()  
            subscription.end_date =  timezone.now() + timezone.timedelta(days=30)
            
            subscription.save()
            
            return JsonResponse({'valid': True, 'discount_amount': coupon.discount_amount})
        except Coupon.DoesNotExist:
            return JsonResponse({'valid': False})


class SubscriptionStatusView(APIView):
    def get(self, request):
        try:
            user_id = request.query_params.get('user_id')
            
            # Validate data
            if not user_id:
                return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if user exists
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the user has an active subscription
            subscription = Subscription.objects.filter(user=user, is_active=True).first()
            
            if subscription:
                return Response({'status': 'active', 'subscription': SubscriptionSerializer(subscription).data})
            else:
                return Response({'status': 'inactive'})
            
        except Exception as e:
            # Log the error and return a generic error response
            print(f"Error: {str(e)}")
            return Response({'error': 'An error occurred. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
