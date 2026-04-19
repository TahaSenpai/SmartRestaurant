from rest_framework import viewsets
from .models import Plat
from .serializers import PlatSerializer

class PlatViewSet(viewsets.ModelViewSet):
    queryset = Plat.objects.all()
    serializer_class = PlatSerializer


# ViewSet pour les ingredients
from rest_framework.viewsets import ModelViewSet
from .models import Ingredient
from .serializers import IngredientSerializer

class IngredientViewSet(ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer



# View pour suggerer des plats en fonction des ingredients
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Plat, Ingredient

@api_view(['POST'])
def suggest_plats(request):
    ingredient_ids = request.data.get("ingredients", [])

    plats = Plat.objects.all()
    result = []

    for plat in plats:
        plat_ingredients = plat.ingredients.all()
        score = sum(1 for ing in plat_ingredients if ing.id in ingredient_ids)

        if score > 0:
            result.append({
                "id": plat.id,
                "nom": plat.nom,
                "score": score
            })

    # trier par score décroissant
    result.sort(key=lambda x: x["score"], reverse=True)

    return Response(result)