from django.http import JsonResponse
from django.conf import settings
import jwt
from apps.users.models import User

class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # if 'admin' in request.path and not request.path.endswith('login/'):
        #     try:
        #         token = request.headers.get('Authorization', '').split(' ')[1]
        #         payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        #         user = User.objects.get(id=payload['user_id'])
                
        #         if not user.role or user.role.name != 'admin':
        #             return JsonResponse({
        #                 'status': 'error',
        #                 'message': 'Permission denied. Admin access required.'
        #             }, status=403)
                
        #         request.user = user
        #     except (jwt.InvalidTokenError, User.DoesNotExist, IndexError):
        #         return JsonResponse({
        #             'status': 'error',
        #             'message': 'Invalid or expired token'
        #         }, status=401)
        #     except Exception as e:
        #         return JsonResponse({
        #             'status': 'error',
        #             'message': str(e)
        #         }, status=500)

        response = self.get_response(request)
        return response 