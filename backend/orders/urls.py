from rest_framework.routers import DefaultRouter
from .views import CommandeViewSet

router = DefaultRouter()
router.register(r'commandes', CommandeViewSet)

urlpatterns = router.urls