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
from ..utils.response import check_is_admin
from django.shortcuts import get_object_or_404

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
        serializer = RegisterSerializer(user, data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            usersrial= UserSerializer(user)
            return success_response(data=usersrial.data,message="chỉnh sửa user thành công ",code=status.HTTP_200_OK)
        return error_response(errors=serializer.errors,message="sửa user thất bại",code=status.HTTP_400_BAD_REQUEST)

class UserAPIView(APIView):
    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết phương thức thanh toán"""
        
        if pk:
            payment_method = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(payment_method)
            return success_response(data=serializer.data)
        payment_methods= User.objects.all()
        serializer = UserSerializer(payment_methods, many=True)
        return success_response(data=serializer.data)

    def post(self, request):
        """Tạo phương thức thanh toán mới"""
        check_is_admin(request.user)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            usersrial= UserSerializer(user)
            return success_response(data=usersrial.data,code=status.HTTP_201_CREATED,message="tạo user thành công")
        return error_response(errors=serializer.errors)

    def put(self, request, pk):
        """Cập nhật toàn bộ phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(User, pk=pk)
        serializer = RegisterSerializer(payment_method, data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            usersrial= UserSerializer(user)
            return success_response(data=usersrial.data,message="chỉnh sửa user thành công ",code=status.HTTP_200_OK)
        return error_response(errors=serializer.errors,message="sửa user thất bại",code=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        """Xóa phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(User, pk=pk)
        payment_method.delete()
        return success_response(message="delete user success",code=status.HTTP_204_NO_CONTENT)