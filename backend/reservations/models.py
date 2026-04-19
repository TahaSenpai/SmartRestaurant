from django.db import models
from django.conf import settings

# Create your models here.
class Reservation(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    heure = models.TimeField()
    nombre_personnes = models.IntegerField()

    def __str__(self):
        return f"Reservation {self.utilisateur} - {self.date}"
    

    