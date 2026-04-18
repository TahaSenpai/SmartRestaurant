from django.db import models

# Create your models here.
class Plat(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    prix = models.FloatField()
    categorie = models.CharField(max_length=50)
    image = models.ImageField(upload_to='plats/', null=True, blank=True)
    ingredients = models.ManyToManyField('Ingredient', blank=True)

    def __str__(self):
        return self.nom

class Ingredient(models.Model):
    nom = models.CharField(max_length=100)
    

    def __str__(self):
        return self.nom

   