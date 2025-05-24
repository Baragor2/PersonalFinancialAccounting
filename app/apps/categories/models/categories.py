from uuid import uuid4

from django.db import models

from app.apps.common.models import TimedBaseModel
from app.apps.users.models.users import User


class Category(TimedBaseModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid4,
        editable=False,
    )
    title = models.CharField(
        verbose_name="Title",
        max_length=255,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="categories",
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["created_at"]
