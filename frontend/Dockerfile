# # Bước 1: Sử dụng Node.js image
# FROM node:18

# # Đặt thư mục làm việc
# WORKDIR /app

# # Copy package.json và package-lock.json vào container
# COPY frontend/package.json frontend/package-lock.json ./

# # Cài đặt dependencies
# RUN npm install

# # Copy toàn bộ mã nguồn vào container
# # COPY . .
# COPY frontend/ .


# # Build ứng dụng với Vite
# RUN npm run build

# EXPOSE 5173

# # Chạy ứng dụng trong chế độ preview của Vite (sau khi đã build)
# CMD ["npm", "run", "preview"]




# Bước 1: Sử dụng Node.js image (sử dụng bản slim để giảm kích thước image)
FROM node:18-slim

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Cài đặt dependencies
RUN npm ci

# Copy mã nguồn
COPY frontend/ .

# Build ứng dụng
RUN npm run build

# Cài đặt server tĩnh để phục vụ ứng dụng (ví dụ: serve)
RUN npm install -g serve

# Expose port (5173 là port mặc định của Vite preview, nhưng có thể thay đổi)
EXPOSE 5173

# Chạy ứng dụng bằng serve
CMD ["serve", "-s", "dist", "-l", "5173"]