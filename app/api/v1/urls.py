from django.urls import include, path

urlpatterns = [
    path("categories/", include("app.apps.main.urls.categories")),
    path("transactions/", include("app.apps.main.urls.transactions")),
    path("reports/", include("app.apps.main.urls.reports")),
    path("users/", include("app.apps.users.urls")),
]
