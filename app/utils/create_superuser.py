from django.contrib.auth import get_user_model
import django

import os

django.setup()

User = get_user_model()

username = os.getenv('SUPERUSER_USERNAME')
password = os.getenv('SUPERUSER_PASSWORD')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=None, password=password)
