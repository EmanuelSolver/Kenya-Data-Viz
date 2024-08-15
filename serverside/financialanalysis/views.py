import pandas as pd
from django.http import JsonResponse
from django.conf import settings
import os
from datetime import datetime

def get_file_path(file_name):
    return os.path.join(settings.STATIC_ROOT, 'data', file_name)

def fetch_daily_share_prices(request):
    try:
        file_path = get_file_path('safaricom_share_prices.csv')
        df = pd.read_csv(file_path)
        df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')

        start_date = datetime(2024, 7, 1)
        current_date = datetime.now()

        filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= current_date)]
        if filtered_df.empty:
            raise ValueError('No share price data found for the specified period.')

        share_prices = filtered_df.to_dict(orient='records')
        return JsonResponse({'share_prices': share_prices})

    except Exception as e:
        return JsonResponse({'error': f'Error processing share price data: {str(e)}'}, status=500)
  
    
def fetch_all_share_prices(request):
    try:
        file_path = get_file_path('safaricom_share_prices.csv')
        df = pd.read_csv(file_path)
        df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')

        start_date = datetime(2024, 6, 1)
        current_date = datetime.now()

        filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= current_date)]
        if filtered_df.empty:
            raise ValueError('No share price data found for the specified period.')

        share_prices = filtered_df.to_dict(orient='records')

        return JsonResponse({'share_prices': share_prices})

    except Exception as e:
        return JsonResponse({'error': f'Error processing share price data: {str(e)}'}, status=500)
    
