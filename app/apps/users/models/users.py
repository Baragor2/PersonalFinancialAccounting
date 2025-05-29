from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models

from app.apps.main.models.common import TimedBaseModel


class User(AbstractUser, TimedBaseModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid4,
        editable=False,
    )

    class Meta:
        ordering = ["created_at"]
