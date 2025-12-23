from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'orders', views.OrderViewSet, basename='order')

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('', include(router.urls)),
    path('checkout/', views.checkout, name='checkout'),
    path('search/', views.search_products, name='search'),
    path('contact/', views.contact_form, name='contact'),
]