import threading
import time
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from core.models import User, Product, Order


class Command(BaseCommand):
    help = 'Insert data concurrently into distributed databases'

    def __init__(self):
        super().__init__()
        self.results = {
            'users': [],
            'products': [],
            'orders': []
        }
        self.lock = threading.Lock()

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting concurrent insertions...'))

        # Sample data as provided in the assignment
        users_data = [
            {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},
            {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'},
            {'id': 3, 'name': 'Charlie', 'email': 'charlie@example.com'},
            {'id': 4, 'name': 'David', 'email': 'david@example.com'},
            {'id': 5, 'name': 'Eve', 'email': 'eve@example.com'},
            {'id': 6, 'name': 'Frank', 'email': 'frank@example.com'},
            {'id': 7, 'name': 'Grace', 'email': 'grace@example.com'},
            {'id': 8, 'name': 'Alice', 'email': 'alice@example.com'},
            {'id': 9, 'name': 'Henry', 'email': 'henry@example.com'},
            {'id': 10, 'name': '', 'email': 'jane@example.com'},  # Invalid: empty name
        ]

        products_data = [
            {'id': 1, 'name': 'Laptop', 'price': 1000.00},
            {'id': 2, 'name': 'Smartphone', 'price': 700.00},
            {'id': 3, 'name': 'Headphones', 'price': 150.00},
            {'id': 4, 'name': 'Monitor', 'price': 300.00},
            {'id': 5, 'name': 'Keyboard', 'price': 50.00},
            {'id': 6, 'name': 'Mouse', 'price': 30.00},
            {'id': 7, 'name': 'Laptop', 'price': 1000.00},
            {'id': 8, 'name': 'Smartwatch', 'price': 250.00},
            {'id': 9, 'name': 'Gaming Chair', 'price': 500.00},
            {'id': 10, 'name': 'Earbuds', 'price': -50.00},  # Invalid: negative price
        ]

        orders_data = [
            {'id': 1, 'user_id': 1, 'product_id': 1, 'quantity': 2},
            {'id': 2, 'user_id': 2, 'product_id': 2, 'quantity': 1},
            {'id': 3, 'user_id': 3, 'product_id': 3, 'quantity': 5},
            {'id': 4, 'user_id': 4, 'product_id': 4, 'quantity': 1},
            {'id': 5, 'user_id': 5, 'product_id': 5, 'quantity': 3},
            {'id': 6, 'user_id': 6, 'product_id': 6, 'quantity': 4},
            {'id': 7, 'user_id': 7, 'product_id': 7, 'quantity': 2},
            {'id': 8, 'user_id': 8, 'product_id': 8, 'quantity': 0},  # Invalid: zero quantity
            {'id': 9, 'user_id': 9, 'product_id': 1, 'quantity': -1},  # Invalid: negative quantity
            {'id': 10, 'user_id': 10, 'product_id': 11, 'quantity': 2},
        ]

        # Create threads for concurrent insertions
        threads = []

        # Users threads
        for user_data in users_data:
            thread = threading.Thread(
                target=self.insert_user,
                args=(user_data,)
            )
            threads.append(thread)

        # Products threads
        for product_data in products_data:
            thread = threading.Thread(
                target=self.insert_product,
                args=(product_data,)
            )
            threads.append(thread)

        # Orders threads
        for order_data in orders_data:
            thread = threading.Thread(
                target=self.insert_order,
                args=(order_data,)
            )
            threads.append(thread)

        # Start all threads
        for thread in threads:
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # Print results
        self.print_results()

    def insert_user(self, user_data):
        try:
            user = User(
                name=user_data['name'],
                email=user_data['email']
            )
            user.save(using='users_db')

            with self.lock:
                self.results['users'].append({
                    'id': user_data['id'],
                    'status': 'SUCCESS',
                    'data': f"User: {user.name} ({user.email})",
                    'thread': threading.current_thread().name
                })
        except ValidationError as e:
            with self.lock:
                self.results['users'].append({
                    'id': user_data['id'],
                    'status': 'FAILED',
                    'error': str(e),
                    'data': user_data,
                    'thread': threading.current_thread().name
                })
        except Exception as e:
            with self.lock:
                self.results['users'].append({
                    'id': user_data['id'],
                    'status': 'ERROR',
                    'error': str(e),
                    'data': user_data,
                    'thread': threading.current_thread().name
                })

    def insert_product(self, product_data):
        try:
            product = Product(
                name=product_data['name'],
                price=product_data['price']
            )
            product.save(using='products_db')

            with self.lock:
                self.results['products'].append({
                    'id': product_data['id'],
                    'status': 'SUCCESS',
                    'data': f"Product: {product.name} - ${product.price}",
                    'thread': threading.current_thread().name
                })
        except ValidationError as e:
            with self.lock:
                self.results['products'].append({
                    'id': product_data['id'],
                    'status': 'FAILED',
                    'error': str(e),
                    'data': product_data,
                    'thread': threading.current_thread().name
                })
        except Exception as e:
            with self.lock:
                self.results['products'].append({
                    'id': product_data['id'],
                    'status': 'ERROR',
                    'error': str(e),
                    'data': product_data,
                    'thread': threading.current_thread().name
                })

    def insert_order(self, order_data):
        try:
            order = Order(
                user_id=order_data['user_id'],
                product_id=order_data['product_id'],
                quantity=order_data['quantity']
            )
            order.save(using='orders_db')

            with self.lock:
                self.results['orders'].append({
                    'id': order_data['id'],
                    'status': 'SUCCESS',
                    'data': f"Order: User {order.user_id}, Product {order.product_id}, Qty {order.quantity}",
                    'thread': threading.current_thread().name
                })
        except ValidationError as e:
            with self.lock:
                self.results['orders'].append({
                    'id': order_data['id'],
                    'status': 'FAILED',
                    'error': str(e),
                    'data': order_data,
                    'thread': threading.current_thread().name
                })
        except Exception as e:
            with self.lock:
                self.results['orders'].append({
                    'id': order_data['id'],
                    'status': 'ERROR',
                    'error': str(e),
                    'data': order_data,
                    'thread': threading.current_thread().name
                })

    def print_results(self):
        self.stdout.write(self.style.SUCCESS('\n=== CONCURRENT INSERTION RESULTS ===\n'))

        # Users results
        self.stdout.write(self.style.WARNING('USERS INSERTIONS:'))
        for result in sorted(self.results['users'], key=lambda x: x['id']):
            if result['status'] == 'SUCCESS':
                self.stdout.write(
                    f"ID {result['id']}: {self.style.SUCCESS('✓ SUCCESS')} - "
                    f"{result['data']} [Thread: {result['thread']}]"
                )
            else:
                self.stdout.write(
                    f"ID {result['id']}: {self.style.ERROR('✗ FAILED')} - "
                    f"Error: {result['error']} [Thread: {result['thread']}]"
                )

        # Products results
        self.stdout.write(self.style.WARNING('\nPRODUCTS INSERTIONS:'))
        for result in sorted(self.results['products'], key=lambda x: x['id']):
            if result['status'] == 'SUCCESS':
                self.stdout.write(
                    f"ID {result['id']}: {self.style.SUCCESS('✓ SUCCESS')} - "
                    f"{result['data']} [Thread: {result['thread']}]"
                )
            else:
                self.stdout.write(
                    f"ID {result['id']}: {self.style.ERROR('✗ FAILED')} - "
                    f"Error: {result['error']} [Thread: {result['thread']}]"
                )

        # Orders results
        self.stdout.write(self.style.WARNING('\nORDERS INSERTIONS:'))
        for result in sorted(self.results['orders'], key=lambda x: x['id']):
            if result['status'] == 'SUCCESS':
                self.stdout.write(
                    f"ID {result['id']}: {self.style.SUCCESS('✓ SUCCESS')} - "
                    f"{result['data']} [Thread: {result['thread']}]"
                )
            else:
                self.stdout.write(
                    f"ID {result['id']}: {self.style.ERROR('✗ FAILED')} - "
                    f"Error: {result['error']} [Thread: {result['thread']}]"
                )

        # Summary
        total_users = len(self.results['users'])
        success_users = len([r for r in self.results['users'] if r['status'] == 'SUCCESS'])
        total_products = len(self.results['products'])
        success_products = len([r for r in self.results['products'] if r['status'] == 'SUCCESS'])
        total_orders = len(self.results['orders'])
        success_orders = len([r for r in self.results['orders'] if r['status'] == 'SUCCESS'])

        self.stdout.write(self.style.SUCCESS('\n=== SUMMARY ==='))
        self.stdout.write(f"Users: {success_users}/{total_users} successful")
        self.stdout.write(f"Products: {success_products}/{total_products} successful")
        self.stdout.write(f"Orders: {success_orders}/{total_orders} successful")
        self.stdout.write(self.style.SUCCESS('\nConcurrent insertions completed!'))
