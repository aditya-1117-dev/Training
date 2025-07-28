from django.urls import path
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
]

# ==================== distributed_system/wsgi.py ====================
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'distributed_system.settings')
application = get_wsgi_application()