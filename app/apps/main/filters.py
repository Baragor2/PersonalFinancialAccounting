from django_filters import CharFilter, DateFromToRangeFilter, FilterSet, UUIDFilter

from app.apps.main.models.transactions import Transaction


class TransactionFilter(FilterSet):
    type = CharFilter(field_name="type", lookup_expr="exact")
    category = UUIDFilter(field_name="category__id", lookup_expr="exact")
    date = DateFromToRangeFilter()

    class Meta:
        model = Transaction
        fields = ["type", "category", "date"]
