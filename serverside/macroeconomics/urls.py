from django.urls import path
from . import views

urlpatterns = [
    path('gdp/', views.fetch_gdp_data, name='fetch_gdp_data'),
    path('population/', views.fetch_population_data, name='fetch_population_data'),
    path('gdp-per-capita/', views.fetch_gdp_per_capita_data, name='fetch_gdp_per_capita_data'),
    path('exchange_rates/', views.fetch_exchange_rates_view, name='fetch_exchange_rates'),
    path('inflation_rates/', views.fetch_inflation_data_view, name='fetch_exchange_rates'),

]
