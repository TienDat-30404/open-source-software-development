# Bước 1: Sử dụng Node.js image
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng với Vite
RUN npm run dev

# Bước 2: Tạo image cho production, sử dụng Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Copy build folder từ container build vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 (Nginx sẽ phục vụ trên cổng này)
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
