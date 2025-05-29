from rest_framework.routers import DefaultRouter

from app.apps.main.views.transactions import TransactionViewSet

router = DefaultRouter()
router.register("", TransactionViewSet, basename="transaction")

urlpatterns = router.urls
