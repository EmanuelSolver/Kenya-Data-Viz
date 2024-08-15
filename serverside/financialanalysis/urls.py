from django.urls import path
from .views import fetch_daily_share_prices, fetch_all_share_prices

urlpatterns = [
    path('daily_share_prices/', fetch_daily_share_prices, name='fetch_daily_share_prices'),
    path('all_share_prices/', fetch_all_share_prices, name='fetch_all_share_prices'),
]
