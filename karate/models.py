#galery app

from django.db import models

class Picture(models.Model):
    image = models.ImageField(null=False, blank=False)
    date_added = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f'Picture number {self.id}'
    
    class Meta:
        ordering = ['date_added']
        verbose_name_plural = "Pictures"

# contact app

from django.db import models

class Contact(models.Model):
	name = models.CharField(max_length=50)
	email = models.EmailField()
	mesajul = models.TextField(max_length=1000)
	telefon = models.CharField(max_length=12, null=False, blank=False)

	def __str__(self):
		return self.name

# concurs app

from django.db import models

class Concurs(models.Model):
	name = models.CharField(max_length=50)
	date = models.DateTimeField()
	descriere = models.TextField(max_length=5000, blank=True, null=True)
	participants = models.PositiveIntegerField(blank=True, null=True)
	medals = models.PositiveIntegerField(blank=True, null=True)
	done = models.BooleanField()
	link = models.CharField(max_length=1000, blank=True, null=True)
	image = models.ImageField(upload_to="sportivi", null=True, blank=True)

	class Meta:
		verbose_name="Concurs"
		ordering = ['-date']

	def __str__(self):
		return self.name

class ConcursImage(models.Model):
	concurs = models.ForeignKey(Concurs, default=None, on_delete=models.CASCADE)
	image = models.ImageField(upload_to="sportivi")

	def __str__(self):
		return self.concurs.name

from django.db import models
from django.utils import timezone

# about app

class Sportiv(models.Model):
	nume = models.CharField(max_length=100)
	bio = models.TextField(max_length=2000, blank=True, null=True)
	ani = models.PositiveIntegerField(blank=True, null=True)
	centura = models.CharField(max_length=100, blank=True, null=True)
	numar_medaliit = models.PositiveIntegerField(blank=True, null=True)
	numar_cupe = models.PositiveIntegerField(blank=True, null=True)
	image = models.ImageField(upload_to="images",blank=True, null=True)	# Remove this if inconvenient 
	created = models.DateTimeField(editable=False)
	modified = models.DateTimeField()

	class Meta:
		verbose_name = "Sportiv"
		verbose_name_plural = "Sportivi"
		ordering = ['modified']

	def __str__(self):
		return self.nume

	def save(self, *args, **kwargs):

		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Sportiv, self).save(*args, **kwargs)

class ImaginiSportiv(models.Model):
	concurs = models.ForeignKey(Sportiv, default=None, on_delete=models.CASCADE) # Many to One 
	image = models.ImageField(upload_to="images", blank=True, null=True)

class Antrenori(models.Model):
	name = models.CharField(max_length=100)
	bio = models.TextField(max_length=2000, null=True, blank=True)
	image = models.ImageField()

	def __str__(self):
		return self.name

class Sponsor(models.Model):
	name = models.CharField(max_length=400, null=True, blank=True)
	image = models.ImageField(null=True, blank=True)
	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f'Sponsorul numarul {self.id}'

	class Meta:
		ordering = ['-date_added']
