from django.urls import path
from .views import InitiateSTKPushView, QuerySTKStatusView

urlpatterns = [
    path('process-stk-push/', InitiateSTKPushView.as_view(), name='stk_push'),
    path('admin_query_check/', QuerySTKStatusView.as_view(), name='query_stk_status'),
]
