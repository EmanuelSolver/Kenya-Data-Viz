from django.contrib import admin
from .models import Coupon, Payment, Subscription

admin.site.register(Coupon)
admin.site.register(Payment)
admin.site.register(Subscription)
