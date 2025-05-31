from rest_framework.routers import DefaultRouter

from app.apps.main.views.categories import CategoryViewSet

router = DefaultRouter()
router.register("", CategoryViewSet, basename="category")

urlpatterns = router.urls
