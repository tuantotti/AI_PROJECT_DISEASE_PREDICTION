from django.urls import path
from .views import AjaxHandlerView
from . import views

urlpatterns = [
    # path('', views.index,name="index"),
    path('', AjaxHandlerView.as_view(),name="AjaxHandlerView"),
]