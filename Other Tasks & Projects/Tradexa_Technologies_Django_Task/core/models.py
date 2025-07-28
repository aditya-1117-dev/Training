from django.db import models
from django.core.exceptions import ValidationError
import re


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    class Meta:
        db_table = 'users'

    def clean(self):
        # Application-level validations
        if not self.name or not self.name.strip():
            raise ValidationError("Name cannot be empty")

        if not self.email or not self.email.strip():
            raise ValidationError("Email cannot be empty")

        # Simple email validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self.email):
            raise ValidationError("Invalid email format")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.email})"


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'products'

    def clean(self):
        # Application-level validations
        if not self.name or not self.name.strip():
            raise ValidationError("Product name cannot be empty")

        if self.price is None:
            raise ValidationError("Price cannot be None")

        if self.price < 0:
            raise ValidationError("Price cannot be negative")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - ${self.price}"


class Order(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    quantity = models.IntegerField()

    class Meta:
        db_table = 'orders'

    def clean(self):
        # Application-level validations
        if self.user_id is None or self.user_id <= 0:
            raise ValidationError("User ID must be a positive integer")

        if self.product_id is None or self.product_id <= 0:
            raise ValidationError("Product ID must be a positive integer")

        if self.quantity is None or self.quantity <= 0:
            raise ValidationError("Quantity must be a positive integer")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order: User {self.user_id}, Product {self.product_id}, Qty {self.quantity}"