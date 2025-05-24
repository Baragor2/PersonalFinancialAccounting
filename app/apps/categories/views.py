from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models.query import QuerySet
from app.apps.categories.models.categories import Category
from app.apps.categories.serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> QuerySet[Category]:
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer) -> None:
        serializer.save(user=self.request.user)
