import smtplib
from django.shortcuts import render, get_object_or_404
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from api.models import Produs, ImaginiProdus, ImaginiProduse, ImaginiAnexe, Anexa

def home(request, *args, **kwargs):
	context = {}
	produse = Produs.objects.filter(active=True, featured=True)[0:4]
	galerieProduse = ImaginiProduse.objects.all()
	anexe =  Anexa.objects.filter(active=True, featured=True)[0:3]
	context['page'] = 'home'
	context['produse'] = produse
	context['galerieProduse'] = galerieProduse
	context['anexe'] = anexe
	return render(request, 'home.html', context)

def about(request, *args, **kwargs):
    context = {}
    context['page'] = 'about'
    return render(request, 'about.html', context)

def produse(request, *args, **kwargs):
    context = {}
    produse = Produs.objects.filter(active=True, featured=True)
    context['page'] = 'produse'
    context['produse'] = produse
    return render(request, 'produse.html', context)

def detailProdus(request, pk, *args, **kwargs):
    context = {}
    produs = Produs.objects.get(slug=pk)
    context['item'] = produs 
    return render(request, 'detail-product.html', context)

def anexe(request, *args, **kwargs):
    context = {}
    anexe =  Anexa.objects.filter(active=True)
    context['page'] = 'anexe'
    context['anexe'] = anexe
    return render(request, 'anexe.html', context)

def detailAnexa(request, pk, *args, **kwargs):
    context = {}
    anexa = Anexa.objects.get(slug=pk)
    context['item'] = anexa
    return render(request, 'detail-anexa.html', context)

def sendEmail(request):

    if request.method == "POST":
        template = render_to_string('email_template.html', {
            'name':request.POST['name'],
            'email':request.POST['email'],
            'message':request.POST['message'],
            'phone':request.POST['telefon']
        })

        email = EmailMessage(
            request.POST['subject'],
            template,
            settings.EMAIL_HOST_USER,
            ['alexmihoc@yahoo.com', 'octaczo22@gmail.com']
        )

        email.fail_silently = False
        email.send()

    return render(request, 'email-success.html')