from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class CustomPagination(PageNumberPagination):
    page_size_query_param = 'size'  # client có thể truyền ?size=2 để thay đổi số lượng mỗi trang

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,  # tổng số item
            'total_pages': math.ceil(self.page.paginator.count / self.get_page_size(self.request)),  # tổng số trang
            'next': self.get_next_link(),  # link trang tiếp theo
            'previous': self.get_previous_link(),  # link trang trước
            'status': 200,  # mã trạng thái trả về
            'data': data  # dữ liệu đã phân trang (danh sách Artist)
        })
