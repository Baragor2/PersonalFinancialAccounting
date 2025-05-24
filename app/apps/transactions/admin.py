from django.contrib import admin
from app.apps.transactions.models.transactions import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('title', 'value', 'category', 'user', 'created_at')
