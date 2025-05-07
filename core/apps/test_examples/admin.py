from django.contrib import admin

from core.apps.test_examples.models.test_examples import TestExample


@admin.register(TestExample)
class TestExampleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'created_at',
        'updated_at',
    )
