# 🛠️ Django Multi-Database Setup with Concurrent Insertions

This project demonstrates a Django setup using **multiple SQLite databases** (`users.db`, `orders.db`, and `products.db`), with **concurrent data insertions** and **application-level validation**.

---

## 🧱 Databases Used

- `users_db` – Stores user-related information  
- `orders_db` – Handles order records  
- `products_db` – Contains product details  

Each database is defined in the `DATABASES` setting in `settings.py`.

---

## 🚀 Getting Started

### 1. Install Django

    pip install django

### 2. Create a Django Project

    django-admin startproject multids
    cd multids

### 3. Create a Django App

    python manage.py startapp core

_Add `'core'` to `INSTALLED_APPS` in `settings.py`._

### 4. Run Migrations for Each Database

    python manage.py makemigrations
    python manage.py migrate --database=users_db
    python manage.py migrate --database=orders_db
    python manage.py migrate --database=products_db

_This creates `users.db`, `orders.db`, and `products.db`._

### 5. Insert Data Concurrently

    python manage.py insert_data

_Performs concurrent insertions into all three databases with validation logic._

---

## ⚠️ Notes

- Django does **not** support cross-database foreign-key constraints; maintain integrity via application logic.  
- Default Django apps (e.g., `admin`, `auth`) will use the `default` database unless routed otherwise.

---

## 📌 Summary of Commands

    pip install django
    django-admin startproject multids
    cd multids
    python manage.py startapp core
    python manage.py makemigrations
    python manage.py migrate --database=users_db
    python manage.py migrate --database=orders_db
    python manage.py migrate --database=products_db
    python manage.py insert_data

---

## 📫 Contact

For issues or suggestions, please open an issue or contact the project maintainer.
