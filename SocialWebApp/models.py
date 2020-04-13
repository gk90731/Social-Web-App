from django.db import models

from AuthApp.models import User

# Create your models here.
class Post(models.Model):
    user      =     models.ForeignKey(User,on_delete=models.CASCADE)# here CASCADE is the behavior to adopt when the referenced object(because it is a foreign key) is deleted. it is not specific to django,this is an sql standard.
    title     =     models.CharField(max_length=100)
    content   =     models.TextField()
    image     =     models.ImageField(upload_to='post_images')
    isVisibilityAll = models.CharField(default="true",max_length=5)
    def __str__(self):
        return f"{self.title}"