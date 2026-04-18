from django.db import models
from django.conf import settings

# Create your models here.
class Avis(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plat = models.ForeignKey('menu.Plat', on_delete=models.CASCADE)
    note = models.IntegerField()
    commentaire = models.TextField()

    def __str__(self):
        return f"Avis {self.note} - {self.plat}"