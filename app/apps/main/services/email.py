from datetime import datetime

from django.template.loader import render_to_string

from app.apps.main.services.reports import generate_report_data
from app.apps.users.models.users import User


def build_email_report(user: User, start_date_str: str, end_date_str: str) -> tuple[str, str]:
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()

    report_data = generate_report_data(user, start_date, end_date)

    subject = f"Financial report from {start_date_str} to {end_date_str}"
    context = {
        "user": user,
        "start_date": start_date,
        "end_date": end_date,
        "data": report_data,
    }
    html_message = render_to_string("report_email.html", context)

    return subject, html_message
