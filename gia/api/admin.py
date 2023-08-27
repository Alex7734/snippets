from django.contrib import admin
from django.contrib import admin
from .models import Produs, ImaginiProdus, Anexa, ImaginiAnexa, ImaginiAnexe, ImaginiProduse

class ImaginiProdusInline(admin.TabularInline):
    model = ImaginiProdus

class ProdusAdmin(admin.ModelAdmin):
	inlines = [
		ImaginiProdusInline
	]

class ImaginiAnexaInline(admin.TabularInline):
    model = ImaginiAnexa

class AnexaAdmin(admin.ModelAdmin):
	inlines = [
		ImaginiAnexaInline
	]


admin.site.register(Produs, ProdusAdmin)
admin.site.register(Anexa, AnexaAdmin)
admin.site.register(ImaginiAnexe)
admin.site.register(ImaginiProduse)
