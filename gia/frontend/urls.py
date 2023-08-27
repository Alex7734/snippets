from django.urls import path
from .views import home, about, produse, anexe, sendEmail, detailAnexa, detailProdus

urlpatterns = [
	path('', home, name="home"),
	path('about', about, name="about"),
	path('produse', produse, name="produse"),
	path('anexe', anexe, name="anexe"),
	path('send-email', sendEmail, name="send-email"),
	path('detail-product/<str:pk>', detailProdus, name="detail-product"),
	path('detail-anexa/<str:pk>', detailAnexa, name="detail-anexa")
]
