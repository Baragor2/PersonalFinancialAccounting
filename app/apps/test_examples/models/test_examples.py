from django.db import models

from app.apps.common.models import TimedBaseModel


class TestExample(TimedBaseModel):
    title = models.CharField(
        verbose_name="Title",
        max_length=255,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Test example'
        verbose_name_plural = 'Test examples'
