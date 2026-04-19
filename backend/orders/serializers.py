from rest_framework import serializers
from .models import Commande, CommandeItem
from django.contrib.auth import get_user_model

User = get_user_model()


class CommandeItemSerializer(serializers.ModelSerializer):
    plat_nom = serializers.CharField(source='plat.nom', read_only=True)

    class Meta:
        model = CommandeItem
        fields = ['plat', 'plat_nom', 'quantite']


class CommandeSerializer(serializers.ModelSerializer):
    items = CommandeItemSerializer(many=True)

    class Meta:
        model = Commande
        fields = ['id', 'date', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')  

        user = User.objects.first()

        commande = Commande.objects.create(
            utilisateur=user,
            statut='en cours'
        )

        for item in items_data:
            CommandeItem.objects.create(
                commande=commande,
                plat=item['plat'],
                quantite=item['quantite']
            )

        return commande