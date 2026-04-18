from django.db import models
from django.conf import settings

# Create your models here.

class Commande(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=50)

    def __str__(self):
        return f"Commande {self.id} - {self.utilisateur}"
    

class CommandeItem(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE)
    plat = models.ForeignKey('menu.Plat', on_delete=models.CASCADE)
    quantite = models.IntegerField()

    def __str__(self):
        return f"{self.plat} x {self.quantite}"