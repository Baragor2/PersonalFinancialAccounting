from django.urls import path, include

urlpatterns = [
    path('v1/', include('app.api.v1.urls')),
]
