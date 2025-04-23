from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User  # hoặc bất cứ model nào bạn muốn dùng
from rest_framework.exceptions import AuthenticationFailed
class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        """
        Override để lấy user theo cách của bạn.
        Mặc định nó dùng User ID trong token payload.
        """
        user_id = validated_token.get("user_id")
        try:
            # Tùy biến ở đây: Dùng model nào, lọc theo field nào là tùy bạn
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed('Không tìm thấy người dùng', code='user_not_found')

        return user
