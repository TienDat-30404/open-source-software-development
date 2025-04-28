from django.shortcuts import render

# Create your views here.
# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer,UserSerializer, RefreshTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import User
from ..utils.response import success_response,error_response
from django.contrib.auth.hashers import make_password
from ..utils.response import check_is_admin
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.exceptions import TokenError
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]  # Không yêu cầu xác thực người dùng
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED,
                                    message="Đăng ký thành công")
        return error_response(errors=serializer.errors)

class RefreshTokenView(APIView):
    def post(self, request):
        serializer = RefreshTokenSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data['refresh']
            try:
                # Xác thực refresh token và lấy access token mới
                refresh = RefreshToken(refresh_token)
                access_token = str(refresh.access_token)
                return Response({'access_token': access_token}, status=status.HTTP_200_OK)
            except TokenError as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Không yêu cầu xác thực người dùng
    
    def set_refresh_cookie(self, response, refresh_token):
        response.set_cookie(
            key='refresh_token',
            value=str(refresh_token),
            httponly=True,
            secure=True,  # 🔒 đổi thành True nếu dùng HTTPS (production)
            samesite='Lax',  # hoặc 'Strict' nếu frontend và backend cùng domain
            max_age=7 * 24 * 60 * 60,  # 7 ngày
            expires=None  # Cookie hết hạn khi trình duyệt đóng (hoặc thiết lập thời gian)
        )
        return response
    
    def set_access_token_cookie(self, response, access_token):
        response.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,  # Ngăn JavaScript truy cập
        secure=True,  # Đảm bảo HTTPS khi trong môi trường production
        samesite='Lax',
        max_age=3600  # Thời gian sống của token (1 giờ)
        )
        return response

    def post(self, request):
        
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            userserial= UserSerializer(user)
            response = Response({
                'data' : userserial.data,
                'accessToken' : access_token
            })
            # self.set_access_token_cookie(response, access_token)
            self.set_refresh_cookie(response, refresh)
            return response
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
        serializer = RegisterSerializer(user, data=request.data, partial=True)
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
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def test_api(request):
    return Response({
        'message': 'API is working!',
        'status': 'success'
    })
    
    
