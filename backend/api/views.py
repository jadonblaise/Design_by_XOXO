from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Q
from .models import Product, Category, Order, OrderItem, ContactMessage
from .serializers import (
    ProductSerializer, CategorySerializer, OrderSerializer,
    CheckoutSerializer, ContactMessageSerializer
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for products"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        
        if category:
            queryset = queryset.filter(category__slug=category)
        
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(category__name__icontains=search)
            )
        
        return queryset


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for categories"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for orders"""
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


@api_view(['POST'])
def checkout(request):
    """Handle checkout process"""
    serializer = CheckoutSerializer(data=request.data)
    
    if serializer.is_valid():
        try:
            # Create order
            order = Order.objects.create(
                total_amount=serializer.validated_data['total'],
                currency=serializer.validated_data['currency'],
                customer_email=serializer.validated_data.get('customer_email', ''),
                status='pending'
            )
            
            # Create order items
            for item_data in serializer.validated_data['items']:
                product = Product.objects.get(id=item_data['id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item_data['quantity'],
                    price=item_data['price']
                )
                
                # Update stock
                if product.stock >= item_data['quantity']:
                    product.stock -= item_data['quantity']
                    product.save()
            
            order_serializer = OrderSerializer(order)
            
            return Response({
                'success': True,
                'message': 'Order placed successfully',
                'order': order_serializer.data
            }, status=status.HTTP_201_CREATED)
            
        except Product.DoesNotExist:
            return Response({
                'success': False,
                'error': 'Product not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_products(request):
    """Search products"""
    query = request.GET.get('q', '')
    
    if not query:
        return Response([])
    
    products = Product.objects.filter(
        Q(name__icontains=query) | 
        Q(description__icontains=query) |
        Q(category__name__icontains=query),
        is_active=True
    )
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def contact_form(request):
    """Handle contact form submissions"""
    serializer = ContactMessageSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Thank you for contacting us! We will get back to you soon.'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'error': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def api_root(request):
    """API root endpoint"""
    return Response({
        'message': 'Welcome to Design by XOXO API',
        'version': '1.0',
        'endpoints': {
            'products': '/api/products/',
            'categories': '/api/categories/',
            'orders': '/api/orders/',
            'checkout': '/api/checkout/',
            'search': '/api/search/?q=query',
            'contact': '/api/contact/'
        }
    })