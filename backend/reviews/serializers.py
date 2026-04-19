from rest_framework import serializers
from .models import Avis
from django.contrib.auth import get_user_model

User = get_user_model()

class AvisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avis
        fields = ['id', 'plat', 'note', 'commentaire']

    def create(self, validated_data):
        # user = self.context['request'].user  
        user = User.objects.first()
        avis = Avis.objects.create(
            utilisateur=user,
            **validated_data
        )

        return avis