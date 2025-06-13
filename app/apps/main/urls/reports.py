from rest_framework.routers import DefaultRouter

from app.apps.main.views.reports import ReportViewSet

router = DefaultRouter()
router.register("", ReportViewSet, basename="report")

urlpatterns = router.urls
