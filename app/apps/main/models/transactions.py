from uuid import uuid4

from django.db import models

from app.apps.main.models.categories import Category
from app.apps.main.models.common import TimedBaseModel
from app.apps.users.models.users import User


class TransactionType(models.TextChoices):
    INCOME = "income"
    EXPENSE = "expense"


class Transaction(TimedBaseModel):
    id = models.UUIDField(
        verbose_name="Id",
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
        verbose_name="User",
        on_delete=models.CASCADE,
        related_name="transactions",
    )
    description = models.TextField(
        verbose_name="Description",
        blank=True,
    )
    date = models.DateField(
        verbose_name="Date",
        blank=False,
    )
    type = models.CharField(
        verbose_name="Transaction Type",
        max_length=7,
        choices=TransactionType.choices,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ["created_at"]
