from django.db import models

class MpesaPayment(models.Model):
    merchant_request_id = models.CharField(max_length=255)
    checkout_request_id = models.CharField(max_length=255)
    result_code = models.IntegerField()
    result_desc = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=255)
    user_phone_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.merchant_request_id
