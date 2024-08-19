from django.urls import path
from .views import csrf_token_view, ProcessPaymentView, StripeWebhookView, CouponVerifyView, SubscriptionStatusView

urlpatterns = [
    path('get-csrf-token/', csrf_token_view, name='csrf_token'),
    path('process-payment/', ProcessPaymentView.as_view(), name='process-payment'),
    path('webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('verify-coupon/', CouponVerifyView.as_view(), name='apply-coupon'),
    path('subscription-status/', SubscriptionStatusView.as_view(), name='subscription-status'),
]
