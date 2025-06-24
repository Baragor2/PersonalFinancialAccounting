from datetime import date
from uuid import uuid4

from django.db import models

from app.apps.main.models.common import TimedBaseModel
from app.apps.main.services.reports import get_start_date
from app.apps.users.models.users import User


class ReportPeriod(models.TextChoices):
    WEEK = "week"
    MONTH = "month"
    QUARTER = "quarter"
    YEAR = "year"


class Report(TimedBaseModel):
    id = models.UUIDField(
        verbose_name="Id",
        primary_key=True,
        default=uuid4,
        editable=False,
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports")
    title = models.CharField(max_length=255)
    period = models.CharField(max_length=10, choices=ReportPeriod.choices)

    @property
    def end_date(self):
        return date.today()

    @property
    def start_date(self):
        return get_start_date(self.period)

    def __str__(self):
        return f"{self.title} ({self.period})"

    class Meta:
        verbose_name = "Report"
        verbose_name_plural = "Reports"
        ordering = ["-created_at"]
