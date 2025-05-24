from django.urls import include, path

urlpatterns = [
    path("v1/", include("app.api.v1.urls")),
]
