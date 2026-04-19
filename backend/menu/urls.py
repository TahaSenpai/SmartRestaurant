from rest_framework.routers import DefaultRouter, path
from .views import IngredientViewSet, PlatViewSet

# objet router c’est lui qui va gerer toutes les URLs API
router = DefaultRouter()  
router.register(r'plats', PlatViewSet)
router.register(r'ingredients', IngredientViewSet)
#créer routes pour Commande

urlpatterns = router.urls

from .views import suggest_plats

urlpatterns += [
    path('suggest/', suggest_plats),
]