# Bước 1: Sử dụng Node.js image
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY frontend/package.json frontend/package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
# COPY . .
COPY frontend/ .


# Build ứng dụng với Vite
RUN npm run build

EXPOSE 5173

# Chạy ứng dụng trong chế độ preview của Vite (sau khi đã build)
CMD ["npm", "run", "preview"]
