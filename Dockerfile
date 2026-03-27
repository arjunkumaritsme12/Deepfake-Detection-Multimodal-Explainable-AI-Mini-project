# Multi-stage build for production deployment
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend source
COPY . .

# Build frontend
RUN npm run build

# Python backend stage
FROM python:3.11-slim AS backend

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgthread-2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ .

# Create necessary directories
RUN mkdir -p temp_uploads processed_media

# Expose port
EXPOSE 8000

# Start the application
CMD ["python", "main.py"]