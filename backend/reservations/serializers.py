from rest_framework import serializers
from .models import Reservation
from django.contrib.auth import get_user_model
from datetime import date

User = get_user_model()

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'date', 'heure', 'nombre_personnes']

    def create(self, validated_data):
        user = User.objects.first()  # comme commande (temporaire)

        reservation = Reservation.objects.create(
            utilisateur=user,
            **validated_data
        )

        return reservation

    # validation nombre personnes
    def validate_nombre_personnes(self, value):
        if value > 40:
            raise serializers.ValidationError("Maximum 40 personnes")
        return value

    # validation date
    def validate_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Date invalide")
        return value