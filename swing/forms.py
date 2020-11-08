from django import forms


class NameForm(forms.Form):
    mass = forms.FloatField(label='Mass')
    stringlen = forms.FloatField(label='Length of string')
    initialangle = forms.FloatField(label='Initial Angle')

    PLANET1 = 'Earth'
    PLANET2 = 'Mars'
    PLANET_CHOICES = ((PLANET1, 'Planet Earth'), (PLANET2, 'Planet Mars'))
    cities = forms.ChoiceField(choices=PLANET_CHOICES)
