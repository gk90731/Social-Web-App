from rest_framework import serializers
from .models import Post
from AuthApp.models import User
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'image', 'isVisibilityAll' )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
       