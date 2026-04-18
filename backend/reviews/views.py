from rest_framework import viewsets
from .models import Avis
from .serializers import AvisSerializer

class AvisViewSet(viewsets.ModelViewSet):
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer