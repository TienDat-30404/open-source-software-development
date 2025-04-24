# users/serializers.py
from rest_framework import serializers
from apps.users.models import User
from django.contrib.auth.hashers import make_password, check_password
from apps.roles.models import Role
from apps.roles.serializers import RoleSerializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(username=data['username'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Tài khoản không tồn tại")

        if not check_password(data['password'], user.password):
            raise serializers.ValidationError("Sai mật khẩu")

        data['user'] = user
        return data
class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id','username', 'email', 'full_name', 'role']
    
