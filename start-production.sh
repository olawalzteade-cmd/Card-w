#!/bin/bash

# Global Bank Nigeria - Production Startup Script

echo "🏦 Global Bank Nigeria - Production Startup"
echo "=========================================="

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p public

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if [ ! -z "$MONGODB_URI" ]; then
    echo "✅ MongoDB URI configured"
else
    echo "❌ MongoDB URI not configured. Please set MONGODB_URI in .env"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --production
fi

# Create logs directory if it doesn't exist
if [ ! -d "logs" ]; then
    mkdir -p logs
fi

# Start the server
echo "🚀 Starting production server..."
NODE_ENV=production node server.js

echo ""
echo "✅ Server started successfully!"
echo "📍 Access the application at: http://localhost:3000"
echo "📍 API endpoint: http://localhost:3000/api/v1"
echo "📍 Health check: http://localhost:3000/health"