# users/serializers.py
from rest_framework import serializers
from apps.users.models import User
from django.contrib.auth.hashers import make_password, check_password
from apps.roles.models import Role
from apps.roles.serializers import RoleSerializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'gender', 'full_name', 'date_of_birth', 'type_login' ]
        extra_kwargs =   {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash password
        if 'password' in validated_data:
            # Hash password
            validated_data['password'] = make_password(validated_data['password'])
        # Gỡ role nếu có trong validated_data (do form gửi lên)
        validated_data.pop("role", None)
        # Get default user role
        user_role = Role.objects.get(name='User')
        # Create user
        user = User.objects.create(role=user_role, **validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = User.objects.get(username=data['username'])
            if check_password(data['password'], user.password):
                data['user'] = user
                return data
            raise serializers.ValidationError("Invalid credentials")
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

class UserSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'gender', 'date_of_birth', 'role', 'role_name', 'created_at', 'updated_at']
        extra_kwargs = {
            'role': {'write_only': True}
        }
        
class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    
