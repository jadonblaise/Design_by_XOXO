from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, ContactMessage


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product model"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 
            'category', 'category_name', 'image', 
            'stock', 'in_stock', 'is_active', 
            'created_at', 'updated_at'
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem model"""
    product_name = serializers.CharField(source='product.name', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model"""
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_email', 
            'total_amount', 'currency', 'status', 
            'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['order_number']


class CheckoutSerializer(serializers.Serializer):
    """Serializer for checkout process"""
    items = serializers.ListField(
        child=serializers.DictField()
    )
    currency = serializers.CharField(max_length=3, default='USD')
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    customer_email = serializers.EmailField(required=False, allow_blank=True)


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for Contact messages"""
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']