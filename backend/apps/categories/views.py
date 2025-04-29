from django.shortcuts import render
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer
from rest_framework import status
from rest_framework.response import Response
import math
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
class CategoryViewSet(viewsets.ModelViewSet): 
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Cho phép list và retrieve không cần đăng nhập
            return [AllowAny()]
        return [IsAuthenticated()]
    def list(self, request, *args, **kwargs): 
        paginator = self.paginator
        size = request.query_params.get('size', None)
        paginate = False
        
        if size is not None:
            try:
                paginate = True
                size = int(size)
                if size > 0:
                    paginator.page_size = size
                else:
                    paginator.page_size = 5 
            except ValueError:
                return Response({"error": "Invalid page size"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            paginator.page_size = 5 
        
        queryset = self.get_queryset()
        
        if paginate:
            page = paginator.paginate_queryset(queryset, request)
            serializer = self.get_serializer(page, many=True)
            total_pages = math.ceil(paginator.page.paginator.count / paginator.page_size)

            return Response({
                'results': serializer.data,
                'count': paginator.page.paginator.count,
                'total_pages': total_pages,
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link(),
                'status': 200
            }, status=status.HTTP_200_OK)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response({
                'results': serializer.data,
                'count': len(serializer.data),
                'total_pages': 1,
                'status': 200
            }, status=status.HTTP_200_OK)
