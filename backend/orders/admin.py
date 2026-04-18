from django.contrib import admin
from .models import Commande, CommandeItem

# Register your models here.

admin.site.register(Commande)
admin.site.register(CommandeItem)