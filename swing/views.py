from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import NameForm

def index(request):

    return render(request, 'homepage.html')


def pendulum(request):

    if request.method == 'POST':

        form = NameForm(request.POST)

        if form.is_valid():

            data = form.cleaned_data
            return render(request, 'pendulum.html', {'form': form, 'data':data})


    else:
        form = NameForm()


    return render(request, 'pendulum.html', {'form': form})


def draganddrop(request):

    return render( request,'dragdrop.html')