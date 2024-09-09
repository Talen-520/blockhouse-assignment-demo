from django.urls import path
from . import views

urlpatterns = [
    path('candlestick-data/',views.candlestick),
    path('line-chart-data/',views.line),
    path('bar-chart-data/',views.bar),
    path('pie-chart-data/',views.pie),
]