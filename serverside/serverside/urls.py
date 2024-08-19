from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('macroeconomics/', include('macroeconomics.urls')),
    path('financial_analysis/', include('financialanalysis.urls')),
    path('payment/', include('stripepayment.urls')),
    path('mpesa/', include('mpesapayment.urls')),


]
