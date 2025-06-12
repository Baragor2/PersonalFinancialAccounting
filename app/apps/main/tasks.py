from datetime import datetime

from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string

from app.apps.main.services.reports import generate_report_data
from app.apps.users.models.users import User


@shared_task
def send_email_report_task(user_id, start_date_str, end_date_str):
    user = User.objects.get(id=user_id)

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

    send_mail(
        subject=subject,
        message="",
        from_email=None,
        recipient_list=[user.email],
        html_message=html_message,
        fail_silently=False,
    )
