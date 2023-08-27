from django.db import models
from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField

class ImaginiProduse(models.Model):
	image = models.ImageField(null=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created']
		verbose_name = 'Imagini produs'
		verbose_name_plural = 'Imagini produse'

	def __str__(self):
		return f'Poza creata pe {self.created}'

class ImaginiAnexe(models.Model):
	image = models.ImageField(null=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created']
		verbose_name = 'Imagini anexa'
		verbose_name_plural = 'Imagini anexe'

	def __str__(self):
		return f'Poza creata pe {self.created}'
    
class Anexa(models.Model):
    name = models.CharField(max_length=200)
    descriere = RichTextUploadingField(null=True, blank=True)
    specificatii = RichTextUploadingField(null=True, blank=True)
    detalii = RichTextUploadingField(null=True, blank=True)
    small_body = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    thumbnail = models.ImageField(null=True)
    slug = models.SlugField(null="True", blank="True")

    class Meta:
        ordering = ['-created', '-name']
        verbose_name = "Anexa"
        verbose_name_plural = "Anexe"

    def save(self, *args, **kwargs):
        if self.slug == None:
            slug = slugify(self.name) 
            has_slug = Produs.objects.filter(slug=slug).exists()
            count = 1
            while has_slug:
                count += 1
                slug = slugify(self.headline) + '-' + str(count)
                has_slug = Produs.objects.filter(slug=slug).exists()
            self.slug = slug 
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    @property
    def getPriceEUR(self):
        return int(float(self.price) / 4.9) + 1

    @property
    def imageURL(self):
        try:
            url = self.thumbnail.url
        except:
            url = ''
        return url

class ImaginiAnexa(models.Model):
    anexa = models.ForeignKey(Anexa, default=None, on_delete=models.CASCADE) 
    image = models.ImageField(null=True)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    class Meta:
        ordering = ['-created']
        verbose_name = "Imagine Produs"
        verbose_name_plural = "Imagini Produs"

    def __str__(self):
        return f'Poza creata pe {self.created}'
        
class Produs(models.Model):
    name = models.CharField(max_length=200)
    descriere = RichTextUploadingField(null=True, blank=True)
    specificatii = RichTextUploadingField(null=True, blank=True)
    detalii = RichTextUploadingField(null=True, blank=True)
    small_body = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    thumbnail = models.ImageField(null=True)
    anexe = models.ManyToManyField(Anexa) 
    slug = models.SlugField(null="True", blank="True")

    def save(self, *args, **kwargs):
        if self.slug == None:
            slug = slugify(self.name) 
            has_slug = Produs.objects.filter(slug=slug).exists()
            count = 1
            while has_slug:
                count += 1
                slug = slugify(self.headline) + '-' + str(count)
                has_slug = Produs.objects.filter(slug=slug).exists()
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def imageURL(self):
        try:
            url = self.thumbnail.url
        except:
            url = ''
        return url

    class Meta:
        ordering = ['-created', '-name']
        verbose_name = "Produs"
        verbose_name_plural = "Produse"

    
    def __str__(self):
        return self.name
    
class ImaginiProdus(models.Model):
    product = models.ForeignKey(Produs, default=None, on_delete=models.CASCADE) 
    image = models.ImageField(null=True)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    class Meta:
        ordering = ['-created']
        verbose_name = "Imagine Produs"
        verbose_name_plural = "Imagini Produs"

    
    def __str__(self):
        return f'Poza creata pe {self.created}'

