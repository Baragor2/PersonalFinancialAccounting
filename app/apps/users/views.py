from rest_framework import generics
from rest_framework.permissions import AllowAny

from app.apps.users.models.users import User
from app.apps.users.serializers import RegisterSerializer, UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
