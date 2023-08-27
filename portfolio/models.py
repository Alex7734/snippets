from django.db import models

class Project(models.Model):
    heading = models.CharField(max_length = 40, unique=True)
    body = models.TextField(max_length = 1000)
    image = models.ImageField(help_text = "An image that demonstrates the working project")
    link = models.CharField(max_length=1000, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.heading

    def is_truncable(self):
        if len(self.body) > 50:
            return True
        return False

class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    message = models.TextField(max_length=1000)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
        verbose_name = "User message and contact"
        verbose_name_plural = "User's messages and contacts"

    def __str__(self):
        return self.name
