from django.contrib import admin
from app.apps.categories.models.categories import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at')
