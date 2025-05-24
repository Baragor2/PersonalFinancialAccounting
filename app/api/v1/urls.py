from django.urls import path, include

urlpatterns = [
    path('categories/', include('app.apps.categories.urls')),
    path('transactions/', include('app.apps.transactions.urls')),
    path('users/', include('app.apps.users.urls')),
]
