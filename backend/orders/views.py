from rest_framework import viewsets
from .models import Commande
from .serializers import CommandeSerializer
from rest_framework.permissions import AllowAny

class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [AllowAny]