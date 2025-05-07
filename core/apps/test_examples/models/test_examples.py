from django.db import models

from core.apps.common.models import TimedBaseModel


class TestExample(TimedBaseModel):
    title = models.CharField(
        verbose_name="Название",
        max_length=255,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Тестовый пример'
        verbose_name_plural = 'Тестовые примеры'
