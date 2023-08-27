from django.forms import ModelForm
from django import forms
from .models import Contact

class ContactForm(ModelForm):
    class Meta:
        model = Contact
        fields = "__all__"
        widgets = {
          'message': forms.Textarea(attrs={'rows':5, 'cols':10}),
        }
