from datetime import date, timedelta

from app.apps.main.models.reports import ReportPeriod


def get_start_date(period: str) -> date | None:
    today = date.today()

    if period == ReportPeriod.WEEK:
        return today - timedelta(days=today.weekday() + 7)
    if period == ReportPeriod.MONTH:
        return today.replace(day=1)
    if period == ReportPeriod.QUARTER:
        current_quarter = (today.month - 1) // 3 + 1
        first_month_of_quarter = (current_quarter - 1) * 3 + 1
        return today.replace(month=first_month_of_quarter, day=1)
    if period == ReportPeriod.YEAR:
        return today.replace(month=1, day=1)

    return None
