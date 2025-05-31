from django.contrib import admin

from app.apps.users.models.users import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "created_at",
        "updated_at",
    )
