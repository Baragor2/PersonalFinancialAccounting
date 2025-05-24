from uuid import uuid4
from django.db import models

from app.apps.categories.models.categories import Category
from app.apps.common.models import TimedBaseModel
from app.apps.users.models.users import User


class Transaction(TimedBaseModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid4,
        editable=False,
    )
    title = models.CharField(
        verbose_name="Title",
        max_length=255,
    )
    value = models.DecimalField(
        verbose_name="Value",
        max_digits=10,
        decimal_places=2,
    )
    category = models.ForeignKey(
        Category,
        verbose_name="Category",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='transactions',
    )
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ['created_at']
