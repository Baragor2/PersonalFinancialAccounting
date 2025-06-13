from collections import defaultdict
from decimal import Decimal

from app.apps.main.models.transactions import Transaction, TransactionType
from app.apps.main.serializers.transactions import TransactionSerializer


def generate_report_data(user, start_date, end_date, category_ids=None):
    transactions_qs = (
        Transaction.objects.filter(user=user, date__gte=start_date, date__lte=end_date)
        .select_related("category")
        .order_by("-date")
    )

    if category_ids:
        valid_category_ids = []
        for category_id in category_ids:
            valid_category_ids.append(category_id)

        if valid_category_ids:
            transactions_qs = transactions_qs.filter(category_id__in=valid_category_ids)

    transactions = transactions_qs

    report_data = {
        "income": {
            "total": Decimal("0.00"),
            "categories": defaultdict(lambda: {"total": Decimal("0.00"), "transactions": []}),
        },
        "expense": {
            "total": Decimal("0.00"),
            "categories": defaultdict(lambda: {"total": Decimal("0.00"), "transactions": []}),
        },
        "final_balance": Decimal("0.00"),
    }

    for transaction in transactions:
        transaction_data = TransactionSerializer(transaction).data
        if transaction.type == TransactionType.INCOME:
            target = report_data["income"]
        else:
            target = report_data["expense"]

        category_name = transaction.category.title

        target["total"] += transaction.value

        category_group = target["categories"][category_name]
        category_group["total"] += transaction.value
        category_group["transactions"].append(transaction_data)

    report_data["income"]["categories"] = [
        {"category_title": title, **data} for title, data in report_data["income"]["categories"].items()
    ]
    report_data["expense"]["categories"] = [
        {"category_title": title, **data} for title, data in report_data["expense"]["categories"].items()
    ]

    report_data["final_balance"] = report_data["income"]["total"] - report_data["expense"]["total"]

    return report_data
