from datetime import date, timedelta
from uuid import uuid4

from django.db import models

from app.apps.main.models.common import TimedBaseModel
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
    def start_date(self):
        today = date.today()
        if self.period == ReportPeriod.WEEK:
            return today - timedelta(days=today.weekday() + 7)
        if self.period == ReportPeriod.MONTH:
            return today.replace(day=1)
        if self.period == ReportPeriod.QUARTER:
            current_quarter = (today.month - 1) // 3 + 1
            first_month_of_quarter = (current_quarter - 1) * 3 + 1
            return today.replace(month=first_month_of_quarter, day=1)
        if self.period == ReportPeriod.YEAR:
            return today.replace(month=1, day=1)
        return None

    @property
    def end_date(self):
        return date.today()

    def __str__(self):
        return f"{self.title} ({self.period})"

    class Meta:
        verbose_name = "Report"
        verbose_name_plural = "Reports"
        ordering = ["-created_at"]
