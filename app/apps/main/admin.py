from django.contrib import admin

from app.apps.main.models.categories import Category
from app.apps.main.models.reports import Report
from app.apps.main.models.transactions import Transaction


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at")


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("title", "value", "category", "user", "created_at")


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "period", "created_at")

    list_filter = ("period", "user")

    search_fields = ("title", "user__username")

    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (None, {"fields": ("user", "title", "period")}),
        (
            "Dates",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )
