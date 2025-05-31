from django.contrib import admin

from app.apps.main.models.categories import Category
from app.apps.main.models.transactions import Transaction


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at")


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("title", "value", "category", "user", "created_at")
