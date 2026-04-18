from rest_framework.routers import DefaultRouter
from .views import PlatViewSet

# objet router c’est lui qui va gerer toutes les URLs API
router = DefaultRouter()  
router.register(r'plats', PlatViewSet)
#créer routes pour Commande

urlpatterns = router.urls