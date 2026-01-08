/**
 * Global Bank Nigeria - Main Server File
 * Production-Ready Node.js Backend
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const giftCardRoutes = require('./routes/giftCards');
const cryptoRoutes = require('./routes/crypto');
const transactionRoutes = require('./routes/transactions');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');
const miningRoutes = require('./routes/mining');
const globalCardRoutes = require('./routes/globalCard');
const supportRoutes = require('./routes/support');
const bankRoutes = require('./routes/bank');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');
const { authenticate } = require('./middleware/auth');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://globalbanknigeria.com', 'https://www.globalbanknigeria.com']
    : ['http://localhost:3000', 'http://localhost:8050'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Compression middleware
app.use(compression());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// API Routes
app.use(`${process.env.API_PREFIX || '/api/v1'}/auth`, authRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/users`, authenticate, userRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/gift-cards`, authenticate, giftCardRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/crypto`, authenticate, cryptoRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/transactions`, authenticate, transactionRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/wallet`, authenticate, walletRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/admin`, authenticate, adminRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/mining`, authenticate, miningRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/global-card`, authenticate, globalCardRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/support`, authenticate, supportRoutes);
app.use(`${process.env.API_PREFIX || '/api/v1'}/bank`, authenticate, bankRoutes);

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Create default admin user if not exists
  const User = require('./models/User');
  User.createDefaultAdmin();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Handle database connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, process.env.HOST || '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏦 GLOBAL BANK NIGERIA - PRODUCTION SERVER             ║
║                                                           ║
║   ✅ Server running on port ${PORT}                          ║
║   ✅ Environment: ${process.env.NODE_ENV}                          ║
║   ✅ Database: Connected                                   ║
║   ✅ API: ${process.env.API_PREFIX || '/api/v1'}                                   ║
║                                                           ║
║   📍 http://localhost:${PORT}                                  ║
║                                                           ║
╚══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;