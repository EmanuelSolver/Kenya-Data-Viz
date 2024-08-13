import requests
from django.http import JsonResponse

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
