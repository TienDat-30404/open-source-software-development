FROM python:3.11

WORKDIR /app

# Copy requirements từ backend cha
COPY requirements.txt ./ 
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy toàn bộ mã backend (vì mcp_server phụ thuộc vào models)
COPY ../ .  

CMD ["python", "scripts/mcp_server.py"]
