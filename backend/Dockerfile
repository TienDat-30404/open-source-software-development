# Sử dụng image Python chính thức
FROM python:3.11

# Cài đặt các dependencies hệ thống (đặc biệt là libpq-dev để kết nối PostgreSQL)
RUN apt-get update && apt-get install -y netcat-openbsd gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy requirements.txt vào container
# COPY requirements.txt ./ 

COPY backend/requirements.txt ./ 

# Cài đặt các thư viện Python từ requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy toàn bộ mã nguồn vào container
# COPY . .

COPY backend/ .



# Lệnh để chạy ứng dụng Django khi container khởi động (dùng Django's development server)
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
