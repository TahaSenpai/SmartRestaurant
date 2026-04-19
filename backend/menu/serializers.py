from rest_framework import serializers
from .models import Plat, Ingredient



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'nom'] 


class PlatSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Plat
        fields = '__all__'

