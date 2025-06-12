from rest_framework import serializers

from app.apps.main.models.reports import Report
from app.apps.main.services.reports import generate_report_data


class ReportSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Report
        fields = ("id", "user", "title", "period", "created_at")
        read_only_fields = ("id", "user", "created_at")


class ReportDetailSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()
    start_date = serializers.DateField(read_only=True)
    end_date = serializers.DateField(read_only=True)

    class Meta:
        model = Report
        fields = ("id", "", "period", "start_date", "end_date", "data")

    def get_data(self, obj: Report):
        category_ids = self.context.get("category_ids", [])

        return generate_report_data(
            user=obj.user, start_date=obj.start_date, end_date=obj.end_date, category_ids=category_ids
        )


class ReportUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ("id", "title")
        read_only_fields = ("id",)
