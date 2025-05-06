from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
def success_response(data=None, message="Thành công",code=status.HTTP_200_OK):
    return Response({
        "status": "success",
        "message": message,
        "data": data
    }, status=code)

def error_response(errors=None,message="Lỗi", code=status.HTTP_400_BAD_REQUEST):
    return Response({
        "status": "error",
        "message": message,
        "errors": errors
    }, status=code)
def check_is_admin(user):
    if not user.is_authenticated:
        raise PermissionDenied("Bạn chưa đăng nhập.")
    if not hasattr(user, 'role') or user.role.name.lower() != 'admin':
        raise PermissionDenied("Bạn không có quyền truy cập.")