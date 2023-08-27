from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Contact, Project
from .forms import ContactForm
from django.views.generic import ListView, DetailView

def index(request):

    form = ContactForm()

    projects = Project.objects.all().order_by("-date_created")[:3][::1]

    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Mesajul a fost trimis catre Alex!')
            return redirect('index')

    context = {'contact': form, 'projects':projects}

    return render(request, 'main/index.html', context)

class ProjectListView(ListView):

	model = Project

	template_name = 'main/projects.html'

	context_object_name = 'projects'

	ordering = ['-date_created']

class ProjectDetailView(DetailView):
    
    model = Project

    template_name = 'main/project-detail.html'

    context_object_name = 'post'
