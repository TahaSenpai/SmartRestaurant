from rest_framework import viewsets
from .models import Reservation
from .serializers import ReservationSerializer
from rest_framework.permissions import AllowAny

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [AllowAny]