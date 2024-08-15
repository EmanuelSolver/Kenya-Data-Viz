import os
from django.conf import settings
import requests
from django.http import JsonResponse
import logging
from datetime import datetime
import pandas as pd
from django.http import JsonResponse


# Configure logging
logger = logging.getLogger(__name__)


def fetch_gdp_data(request):
    try:
        # Direct request to World Bank API for GDP data
        url = 'https://api.worldbank.org/v2/country/KE/indicator/NY.GDP.MKTP.CD?format=json&date=2010:2024'
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for HTTP issues

        # Parse the JSON response
        data = response.json()
        gdp_data = data[1]  # Data is in the second element of the response
        
        # Prepare response data
        return JsonResponse(gdp_data, safe=False)

    except Exception as e:
        # Log the error
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error fetching GDP data: {str(e)}")
        return JsonResponse({'error': f'Error fetching GDP data: {str(e)}'}, status=500)


def fetch_population_data(request):
    try:
        # Direct request to World Bank API for population data
        url = 'https://api.worldbank.org/v2/country/KE/indicator/SP.POP.TOTL?format=json&date=2010:2024'
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for HTTP issues

        # Parse the JSON response
        data = response.json()
        population_data = data[1]  # Data is in the second element of the response
        
        # Prepare response data
        return JsonResponse(population_data, safe=False)

    except Exception as e:
        # Log the error
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error fetching population data: {str(e)}")
        return JsonResponse({'error': f'Error fetching population data: {str(e)}'}, status=500)


def fetch_gdp_per_capita_data(request):
    try:
        # Direct request to World Bank API for GDP per capita data
        url = 'https://api.worldbank.org/v2/country/KE/indicator/NY.GDP.PCAP.CD?format=json&date=2010:2024'
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for HTTP issues

        # Parse the JSON response
        data = response.json()
        gdp_per_capita_data = data[1]  # Data is in the second element of the response
        
        # Prepare response data
        return JsonResponse(gdp_per_capita_data, safe=False)

    except Exception as e:
        # Log the error
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error fetching GDP per capita data: {str(e)}")
        return JsonResponse({'error': f'Error fetching GDP per capita data: {str(e)}'}, status=500)



def get_file_path(file_name):
    return os.path.join(settings.BASE_DIR, 'static', 'data', file_name)

def fetch_exchange_rates_view(request):
    try:
        file_path = get_file_path('historical_exchange_rates.csv')
        # Load CSV data into a DataFrame
        df = pd.read_csv(file_path)
        # Convert the Date column to datetime format
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce', format='%Y-%m-%d')

        # Drop rows with invalid dates
        df = df.dropna(subset=['Date'])

        # Define the start date for filtering (January 1, 2019)
        start_date = datetime(2019, 1, 1)

        # Filter for USD and dates from 2019 to the present
        filtered_df = df[(df['Currency'] == 'US DOLLAR') & (df['Date'] >= start_date)]

        # Select relevant columns
        filtered_df = filtered_df[['Date', 'Mean']]
        
        # Reset index for a clean output
        filtered_df.reset_index(drop=True, inplace=True)
        
        if filtered_df.empty:
            return JsonResponse({'error': 'No USD exchange rate data found for the specified period.'}, status=404)
        
        # Output the filtered data
        data = filtered_df.to_dict(orient='records')
        
        return JsonResponse({'exchange_rates': data})

    except FileNotFoundError as e:
        return JsonResponse({'error': f'File not found: {str(e)}'}, status=404)
    except pd.errors.EmptyDataError as e:
        return JsonResponse({'error': f'No data in file: {str(e)}'}, status=500)
    except pd.errors.ParserError as e:
        return JsonResponse({'error': f'Error parsing CSV file: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)


def fetch_inflation_data_view(request):
    try:
        file_path = get_file_path('historical_inflation_rates.csv')
        df = pd.read_csv(file_path)

        # Convert 'Month' from name to number
        df['Month'] = pd.to_datetime(df['Month'], format='%B').dt.month

        # Create a 'Date' column from 'Year' and 'Month'
        df['Date'] = pd.to_datetime(df[['Year', 'Month']].assign(DAY=1))

        # Select relevant columns
        df = df[['Date', 'Annual_Average_Inflation', '12_Month_Inflation']]
       
        # Prepare the data for frontend
        inflation_data = df.to_dict(orient='records')

        return JsonResponse({"inflation_data": inflation_data})

    except Exception as e:
        print(f"Error processing inflation data: {str(e)}")
        return JsonResponse({"error": "Error processing data"}, status=500)

