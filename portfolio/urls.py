from django.urls import path
from .views import (
    index,
    ProjectDetailView,
    ProjectListView
)

urlpatterns = [
    path('', index, name="index"),
    path('project-detail/<int:pk>/', ProjectDetailView.as_view(), name="project-detail"),
    path('projects/', ProjectListView.as_view(), name="projects"),
]
