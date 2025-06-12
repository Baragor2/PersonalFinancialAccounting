from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.apps.main.models.reports import Report
from app.apps.main.serializers.reports import (
    ReportDetailSerializer,
    ReportEmailSerializer,
    ReportSerializer,
    ReportUpdateSerializer,
)
from app.apps.main.tasks import send_email_report_task


class ReportViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Report.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ReportDetailSerializer
        if self.action == "partial_update":
            return ReportUpdateSerializer
        return ReportSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        category_ids = self.request.query_params.getlist("category_ids")
        context["category_ids"] = category_ids
        return context

    @action(detail=False, methods=["post"], url_path="send-email")
    def send_email_report(self, request):
        serializer = ReportEmailSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            start_date = validated_data.get("start_date")
            end_date = validated_data.get("end_date")

            user = request.user

            start_date_str = start_date.strftime("%Y-%m-%d")
            end_date_str = end_date.strftime("%Y-%m-%d")
            send_email_report_task(user.id, start_date_str, end_date_str)

            return Response({"detail": "Report sended"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="category_ids",
                required=False,
                type={"type": "array", "items": {"type": "string", "format": "uuid"}},
                style="form",
                explode=True,
            )
        ]
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
