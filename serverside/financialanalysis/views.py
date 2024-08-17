import pandas as pd
from django.http import JsonResponse
from django.conf import settings
import os
from datetime import datetime, timedelta


def get_file_path(file_name):
    return os.path.join(settings.STATIC_ROOT, 'data', file_name)


def fetch_daily_share_prices(request):
    period = request.GET.get('period', 'JULY')  # Corrected to request.GET

    try:
        file_path = get_file_path('safaricom_share_prices.csv')
        df = pd.read_csv(file_path)
        df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')
        
        if period == 'JULY':
            start_date = datetime(2024, 7, 1)
            end_date = datetime.now()
        elif period == '2M':
            end_date = datetime.now()
            start_date = end_date - timedelta(days=60)
        elif period == '5D':
            end_date = datetime.now()
            start_date = end_date - timedelta(days=5)
            
        filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
        
        if filtered_df.empty:
            raise ValueError('No share price data found for the specified period.')

        share_prices = filtered_df.to_dict(orient='records')
        return JsonResponse({'share_prices': share_prices})

    except Exception as e:
        return JsonResponse({'error': f'Error processing share price data: {str(e)}'}, status=500)



def fetch_all_share_prices(request):
    period = request.GET.get('period', '3M')  # Default to 3M if no period is specified

    try:
        file_path = get_file_path('safaricom_share_prices.csv')
        df = pd.read_csv(file_path)
        df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')

        # Set the default start date to 1st June 2024
        start_date = datetime(2024, 6, 1)
        current_date = datetime.now()

        # Adjust start_date based on the period filter
        if period == '3M':
            start_date = current_date - timedelta(days=90)
        elif period == '1M':
            start_date = current_date - timedelta(days=30)
        elif period == '5D':
            start_date = current_date - timedelta(days=5)

        # Filter the DataFrame based on the date range
        filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= current_date)]

        if filtered_df.empty:
            raise ValueError('No share price data found for the specified period.')

        share_prices = filtered_df.to_dict(orient='records')
        return JsonResponse({'share_prices': share_prices})

    except Exception as e:
        return JsonResponse({'error': f'Error processing share price data: {str(e)}'}, status=500)
