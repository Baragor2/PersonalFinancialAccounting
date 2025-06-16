import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.project.settings.local")

app = Celery("app.project.settings.local")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()
