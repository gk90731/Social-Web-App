from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

# modifying abstract user by including phone and setting USERNAME_FIELD as phone number
class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=10)
    email = models.EmailField(_('email address'),blank=True)
    phone = models.CharField(unique=True,null=True, max_length=15)
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['username', 'email', 'first_name', 'last_name']

    def __str__(self):
        return "{}".format(self.phone)

# extending User as UserProfile
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    dob = models.DateField(blank=True,null=True)
