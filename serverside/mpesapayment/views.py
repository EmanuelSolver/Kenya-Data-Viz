import requests
from django.http import JsonResponse
from rest_framework.views import APIView
from django.conf import settings
from datetime import datetime
import json
import base64
from .models import MpesaPayment

# a view to generate access token
def get_access_token():
    consumer_key = settings.CONSUMER_KEY
    consumer_secret = settings.CONSUMER_SECRET
    access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    headers = { 'Content-Type': 'application/json'}
    auth = (consumer_key, consumer_secret)
    
    try:
        response = requests.get(access_token_url, headers=headers, auth=auth)
        response.raise_for_status()
        result = response.json()
        return result['access_token']
    except requests.exceptions.RequestException as e:
        return None

# a view to process payment
class InitiateSTKPushView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
   
            amount = data.get('amount')
            phone = data.get('phone_number')

            if phone and amount:
                if phone[0] == '0':
                    phone = '254' + phone[1:]
                elif phone[0] == '+':
                    phone = phone[1:]

                access_token = get_access_token()
                if not access_token:
                    return JsonResponse({'error': 'Failed to retrieve access token.'}, status=500)
                
                passkey = settings.PASS_KEY
                business_short_code = settings.BUSINESS_SHORT_CODE
                process_request_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                callback_url = 'https://mydomain.com/path'  # Change after hosting
                timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
                password = base64.b64encode((business_short_code + passkey + timestamp).encode()).decode()
                stk_push_headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
                stk_push_payload = {
                    'BusinessShortCode': business_short_code,
                    'Password': password,
                    'Timestamp': timestamp,
                    'TransactionType': 'CustomerPayBillOnline',
                    'Amount': int(amount),
                    'PartyA': phone,
                    'PartyB': business_short_code,
                    'PhoneNumber': phone,
                    'CallBackURL': callback_url,
                    'AccountReference': 'Kenya Data Viz',
                    'TransactionDesc': 'stkpush test'
                }

                try:
                    response = requests.post(process_request_url, headers=stk_push_headers, json=stk_push_payload)
                    response.raise_for_status()
                    response_data = response.json()
                    checkout_request_id = response_data.get('CheckoutRequestID')
                    response_code = response_data.get('ResponseCode')
                    
                    if response_code == "0":
                        return JsonResponse({'CheckoutRequestID': checkout_request_id, 'ResponseCode': response_code})
                    else:
                        return JsonResponse({'error': 'STK push failed.'}, status=400)
                except requests.exceptions.RequestException as e:
                    return JsonResponse({'error': str(e)}, status=500)
            else:
                return JsonResponse({'error': 'Missing amount or phone number.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

class QuerySTKStatusView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            access_token = get_access_token()
            if not access_token:
                return JsonResponse({'error': 'Failed to retrieve access token.'}, status=500)
            
            query_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
            business_short_code = settings.BUSINESS_SHORT_CODE
            timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
            passkey = settings.PASS_KEY
            password = base64.b64encode((business_short_code + passkey + timestamp).encode()).decode()
            checkout_request_id = request.GET.get('checkout_request_id')  # Pass ID as query parameter
            
            query_headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
            query_payload = {
                'BusinessShortCode': business_short_code,
                'Password': password,
                'Timestamp': timestamp,
                'CheckoutRequestID': checkout_request_id
            }

            try:
                response = requests.post(query_url, headers=query_headers, json=query_payload)
                response.raise_for_status()
                response_data = response.json()

                if 'ResultCode' in response_data:
                    result_code = response_data['ResultCode']
                    result_messages = {
                        '1037': "Timeout in completing transaction",
                        '1032': "Transaction has been canceled by the user",
                        '1019': "Error encountered while processing request",
                        '1': "The balance is insufficient for the transaction",
                        '0': "The transaction was successful"
                    }
                    message = result_messages.get(result_code, "Unknown result code: " + result_code)
                else:
                    message = "Error in response"

                return JsonResponse({'message': message})
            except requests.exceptions.RequestException as e:
                return JsonResponse({'error': 'Error: ' + str(e)}, status=500)
            except json.JSONDecodeError as e:
                return JsonResponse({'error': 'Error decoding JSON: ' + str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
# a view to log the callback from Safaricom and store the data in the database
def process_stk_callback(request):
    if request.method == 'POST':
        stk_callback_response = json.loads(request.body)
        
        # Log callback response (for debugging purposes)
        log_file = "stkPush_response.json"
        with open(log_file, "a") as log:
            json.dump(stk_callback_response, log)
        
        # Process callback data
        merchant_request_id = stk_callback_response['Body']['stkCallback']['MerchantRequestID']
        checkout_request_id = stk_callback_response['Body']['stkCallback']['CheckoutRequestID']
        result_code = stk_callback_response['Body']['stkCallback']['ResultCode']
        result_desc = stk_callback_response['Body']['stkCallback']['ResultDesc']
        amount = stk_callback_response['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value']
        transaction_id = stk_callback_response['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value']
        user_phone_number = stk_callback_response['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value']
        
        if result_code == 0:
            # Create a new Payment object and save it to the database
            payment = MpesaPayment.objects.create(
                merchant_request_id=merchant_request_id,
                checkout_request_id=checkout_request_id,
                result_code=result_code,
                result_desc=result_desc,
                amount=amount,
                transaction_id=transaction_id,
                user_phone_number=user_phone_number
            )
            payment.save()
        
        return JsonResponse({'status': 'Callback processed successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
