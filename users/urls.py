from django.urls import path
from .views import register_user,dashboard

urlpatterns = [
    path('register/', register_user),
    path('dashboard/', dashboard),
]