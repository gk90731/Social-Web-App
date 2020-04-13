
from rest_framework import serializers
from .models import User, UserProfile
from rest_auth.serializers import LoginSerializer

from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions
from rest_framework.exceptions import ValidationError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('dob',)

class CustomLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=False)
    phone = serializers.IntegerField(required=True)
    def _validate_phone(self, phone, password):
        user = None
        if phone and password:
            user = authenticate(phone=phone, password=password)
        else:
            msg = _('Must include "phone number" and "password".')
            raise exceptions.ValidationError(msg)

        return user
    def validate(self, attrs):
        phone = attrs.get('phone')
        password = attrs.get('password')
        user = None
        if phone:
            user = self._validate_phone(phone, password)
        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs
class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Bifrost user writable nested serializer
    """
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('url', 'phone', 'email', 'first_name', 'last_name', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.dob = profile_data.get('dob', profile.dob)
        profile.save()

        return instance
