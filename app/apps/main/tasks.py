from celery import shared_task
from django.core.mail import send_mail

from app.apps.main.services.email import build_email_report
from app.apps.users.models.users import User


@shared_task
def send_email_report_task(user_id, start_date_str, end_date_str):
    user = User.objects.get(id=user_id)
    subject, html_message = build_email_report(user, start_date_str, end_date_str)

    send_mail(
        subject=subject,
        message="",
        from_email=None,
        recipient_list=[user.email],
        html_message=html_message,
        fail_silently=False,
    )
