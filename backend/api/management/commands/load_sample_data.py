from django.core.management.base import BaseCommand
from api.models import Category, Product


class Command(BaseCommand):
    help = 'Load sample product data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading sample data...')
        
        # Create categories
        african, _ = Category.objects.get_or_create(
            name='African Prints',
            slug='african',
            defaults={'description': 'Beautiful African print fashion'}
        )
        
        casual, _ = Category.objects.get_or_create(
            name='Casual Wear',
            slug='casual',
            defaults={'description': 'Comfortable casual clothing'}
        )
        
        event, _ = Category.objects.get_or_create(
            name='Event Wear',
            slug='event',
            defaults={'description': 'Elegant event and party dresses'}
        )
        
        # Create products
        products = [
            {
                'name': 'Ankara Maxi Dress',
                'description': 'Beautiful Ankara print maxi dress perfect for any occasion',
                'price': 89.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&h=600&fit=crop',
                'stock': 15
            },
            {
                'name': 'Kente Print Blazer',
                'description': 'Elegant Kente pattern blazer for formal occasions',
                'price': 129.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1610652492500-ded49c4f4a28?w=500&h=600&fit=crop',
                'stock': 10
            },
            {
                'name': 'African Print Jumpsuit',
                'description': 'Stylish African print jumpsuit for the modern woman',
                'price': 94.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1583327171004-91e52283f61e?w=500&h=600&fit=crop',
                'stock': 12
            },
            {
                'name': 'Casual White Tee',
                'description': 'Classic white casual tee for everyday wear',
                'price': 29.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
                'stock': 25
            },
            {
                'name': 'Denim Jacket',
                'description': 'Trendy denim jacket perfect for casual outings',
                'price': 79.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
                'stock': 18
            },
            {
                'name': 'Casual Summer Dress',
                'description': 'Light summer dress for hot days',
                'price': 59.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop',
                'stock': 20
            },
            {
                'name': 'Elegant Evening Gown',
                'description': 'Stunning evening gown for special occasions',
                'price': 199.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=600&fit=crop',
                'stock': 8
            },
            {
                'name': 'Cocktail Dress',
                'description': 'Chic cocktail dress for parties',
                'price': 149.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&h=600&fit=crop',
                'stock': 10
            },
            {
                'name': 'Sequin Party Dress',
                'description': 'Glamorous sequin dress for night events',
                'price': 179.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop',
                'stock': 7
            },
            {
                'name': 'Wax Print Skirt Set',
                'description': 'Traditional wax print skirt set',
                'price': 109.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
                'stock': 14
            },
            {
                'name': 'Casual Joggers Set',
                'description': 'Comfortable joggers set for relaxing',
                'price': 69.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1580904449184-e1a93d7d8082?w=500&h=600&fit=crop',
                'stock': 22
            },
            {
                'name': 'Formal Ball Gown',
                'description': 'Luxurious formal ball gown',
                'price': 249.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop',
                'stock': 5
            }
        ]
        
        for product_data in products:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created: {product.name}'))
            else:
                self.stdout.write(f'Already exists: {product.name}')
        
        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))