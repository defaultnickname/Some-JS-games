"""pendulum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from swing import views as views_swing


urlpatterns = [
    path('', views_swing.index, name ='index'),
    path('pendulum/', views_swing.pendulum,name ="pendulum"),
    path('throwgame/', views_swing.draganddrop, name ='draganddrop'),
    path('admin/', admin.site.urls),
]
