import requests
from bs4 import BeautifulSoup
from datetime import datetime
from django.core.management.base import BaseCommand
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Fetch exchange rates from Central Bank of Kenya'

    def handle(self, *args, **kwargs):
        exchange_rates = self.fetch_exchange_rates()
        if exchange_rates:
            # For demonstration purposes, we're just printing the exchange rates
            for rate in exchange_rates:
                self.stdout.write(f"Date: {rate['date']}, Value: {rate['value']}")
        else:
            self.stdout.write("No exchange rates found or there was an error.")

    def fetch_exchange_rates(self):
        url = 'https://www.centralbank.go.ke/rates/forex-exchange-rates/'
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            print(soup.prettify())  # For debugging
            
            # Try to find the table in a more generic way
            table = soup.find('table')
            
            if not table:
                raise ValueError('Exchange rates table not found on the page.')
            
            # Identify headers
            headers = [header.text.strip() for header in table.find_all('th')]
            print("Headers:", headers)  # For debugging
            
            # Identify rows
            rows = table.find_all('tr')[1:]  # Skipping header row
            
            exchange_rates = []
            for row in rows:
                cols = row.find_all('td')
                if len(cols) < len(headers):
                    continue  # Skip rows that don't have enough columns
                
                date_text = cols[0].text.strip()
                currency = cols[1].text.strip()
                mean = cols[2].text.strip()
                
                try:
                    if currency == 'US DOLLAR ':
                        # Adjust date format if necessary
                        date = datetime.strptime(date_text, '%d-%b-%Y').strftime('%Y-%m-%d')
                        exchange_rates.append({
                            'date': date,
                            'value': mean
                        })
                except ValueError as e:
                    logger.warning(f"Date format error for date '{date_text}': {e}")
            
            if not exchange_rates:
                raise ValueError('No USD exchange rate data found.')

            return exchange_rates

        except requests.RequestException as e:
            logger.error(f"Request error: {str(e)}")
            return []

        except ValueError as e:
            logger.error(f"Value error: {str(e)}")
            return []

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return []
