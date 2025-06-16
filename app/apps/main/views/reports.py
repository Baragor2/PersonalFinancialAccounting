from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.apps.main.enums import ViewAction
from app.apps.main.models.reports import Report
from app.apps.main.serializers.reports import (
    ReportDetailSerializer,
    ReportSerializer,
    ReportUpdateSerializer,
)
from app.apps.main.services.reports import get_start_date


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
        if self.action == ViewAction.RETRIEVE:
            return ReportDetailSerializer
        if self.action == ViewAction.PARTIAL_UPDATE:
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
        response = super().retrieve(request, *args, **kwargs)

        report = self.get_object()
        start_date = get_start_date(report.period)

        data = response.data
        data["start_date"] = start_date.isoformat() if start_date else None

        return Response(data)
