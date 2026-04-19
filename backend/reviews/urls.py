from rest_framework.routers import DefaultRouter
from .views import AvisViewSet

router = DefaultRouter()
router.register(r'reviews', AvisViewSet)

urlpatterns = router.urls