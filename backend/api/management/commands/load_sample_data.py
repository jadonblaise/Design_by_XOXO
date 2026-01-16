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
                'image': 'https://images.unsplash.com/photo-1601653233006-5c9fd30eab12?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 15
            },
            {
                'name': 'Kente Print Blazer',
                'description': 'Elegant Kente pattern blazer for formal occasions',
                'price': 69.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1610522983738-d935e6f1e0eb?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 10
            },
            {
                'name': 'African Print Jumpsuit',
                'description': 'Stylish African print jumpsuit for the modern woman',
                'price': 94.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1673227527020-cdc9bd479001?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 12
            },
            {
                'name': 'Casual African culture gown',
                'description': 'Classic African culture gown for everyday wear',
                'price': 29.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1709809081557-78f803ce93a0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 25
            },
            {
                'name': 'Ankara Maxi Dress',
                'description': 'Trendy Ankara maxi dress perfect for casual outings',
                'price': 79.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1663044023009-cfdb6dd6b89c?q=80&w=1007&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 18
            },
            {
                'name': 'Casual Summer Dress',
                'description': 'Light summer dress for hot days',
                'price': 59.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1636342518291-92b11558b405?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 20
            },
            {
                'name': 'Elegant Evening Gown',
                'description': 'Stunning evening gown for special occasions',
                'price': 47.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1747172556919-80fbcd20d32e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 8
            },
            {
                'name': 'Cocktail Dress',
                'description': 'Chic cocktail dress for parties',
                'price': 37.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1747171503581-2fbc57455b09?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 10
            },
            {
                'name': 'Sequin Party Dress',
                'description': 'Glamorous sequin dress for night events',
                'price': 27.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1652092956602-8da6348b986f?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 7
            },
            {
                'name': 'Wax Print Skirt Set',
                'description': 'Traditional wax print skirt set',
                'price': 57.99,
                'category': african,
                'image': 'https://images.unsplash.com/photo-1550835002-8621fdda0461?q=80&w=1041&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 14
            },
            {
                'name': 'Ankara Hair Wrap',
                'description': 'Comfortable Ankara hair wrap for relaxing',
                'price': 69.99,
                'category': casual,
                'image': 'https://images.unsplash.com/photo-1649967322800-5f215ed89863?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'stock': 22
            },
            {
                'name': 'Formal Ball Gown',
                'description': 'Luxurious formal ball gown',
                'price': 34.99,
                'category': event,
                'image': 'https://images.unsplash.com/photo-1538650403596-09e4be7c094b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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