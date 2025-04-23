from django.shortcuts import render

# Create your views here.
# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer,UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import User
from ..utils.response import success_response,error_response
from django.contrib.auth.hashers import make_password
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]  # Không yêu cầu xác thực người dùng
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED,
                                    message="Đăng ký thành công")
        return error_response(errors=serializer.errors)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Không yêu cầu xác thực người dùng
    def post(self, request):
        
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            userserial= UserSerializer(user)
            return Response({
                'data':userserial.data,
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileView(APIView):


    def get(self, request):
        # Lấy người dùng hiện tại từ request.user
        user = request.user
        # Serialize thông tin người dùng
        serializer = UserSerializer(user)

        # Trả về thông tin profile dưới dạng JSON
        return success_response(data=serializer.data,code=status.HTTP_200_OK,message="success")
class UpdateUserProfileView(APIView):
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)  # partial=True cho phép cập nhật một phần
        if serializer.is_valid():
            serializer.save()
            new_password = request.data.get("password")
            if new_password:
                user.password = make_password(new_password)  # Mã hóa mật khẩu mới
                user.save()
            return success_response(data=serializer.data,code=status.HTTP_200_OK,message="Cập nhật thành công")
        return error_response(errors=serializer.errors,code=status.HTTP_400_BAD_REQUEST,message="Cập nhật không thành công")
     