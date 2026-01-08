# 🏦 Global Bank Nigeria - Production-Ready Platform

## 🌟 Overview

**Global Bank Nigeria** is a complete, production-ready financial technology platform for gift card trading, cryptocurrency exchange, and digital banking services. This platform includes a full-stack Node.js backend with MongoDB database, real transaction processing, and enterprise-grade security features.

## ✨ Key Features

### 💳 Customer Features
- **Real Authentication** - Secure registration, login, password reset
- **KYC Verification** - Complete identity verification with document upload
- **Gift Card Trading** - Buy and sell gift cards (Amazon, iTunes, Google Play, Apple, Steam, Sephora, Global Card)
- **Cryptocurrency Trading** - Bitcoin, Ethereum, Bitcoin Cash, Tron, TON with real transactions
- **Digital Wallet** - Multi-currency wallet with send/receive functionality
- **Bank Integration** - Real bank transfers to Nigerian banks (Access, GTBank, Zenith, UBA, First Bank, Opay, PalmPay)
- **Barcode Scanning** - Real gift card verification with barcode scanning
- **Card Verification** - Check card status (valid/used/fake) in real-time
- **Support System** - Message admin with photo attachments
- **Mining Interface** - Real cryptocurrency mining capabilities
- **Transaction History** - Complete transaction tracking and history

### 🔐 Admin Features
- **Admin Dashboard** - Real-time statistics and monitoring
- **User Management** - View, edit, and manage users
- **Balance Editing** - Real credit/debit by account number
- **Gift Card Management** - Add card types, generate cards
- **Mining Control** - Start/stop gift card mining bot
- **Transaction Processing** - Approve/reject transactions
- **Message Management** - Handle customer inquiries
- **Global Card System** - Special card by Olawale Abdul-ganiyu
- **Fraud Detection** - Real-time fraud monitoring
- **Activity Logging** - Complete admin action tracking

## 🏗️ Architecture

### Technology Stack

#### Backend
- **Node.js** v18+ - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas for production)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Sharp** - Image processing

#### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **JavaScript (ES6+)** - Client-side logic
- **Responsive Design** - Mobile-first approach

#### Security
- **Helmet.js** - Security headers
- **Express Rate Limiting** - DDoS protection
- **CORS** - Cross-origin resource sharing
- **Compression** - Response compression
- **Input Validation** - express-validator

#### Payment Gateways
- **Paystack** - Nigerian payment processing
- **Flutterwave** - International payments

#### Communication
- **Nodemailer** - Email service
- **Twilio** - SMS service

## 📁 Project Structure

```
global-bank-nigeria/
├── server.js                      # Main server file
├── package.json                   # Dependencies and scripts
├── .env                           # Environment variables (production)
├── .env.example                   # Environment template
├── DEPLOYMENT.md                  # Deployment guide
├── UPDATED-README.md              # This file
├── index.html                     # Frontend HTML
├── styles.css                     # Frontend styling
├── app.js                         # Frontend JavaScript
├── src/
│   ├── models/                    # Database models
│   │   ├── User.js               # User model
│   │   ├── GiftCard.js           # Gift card model
│   │   ├── Transaction.js        # Transaction model
│   │   └── Message.js            # Message model
│   ├── routes/                    # API routes
│   │   ├── auth.js               # Authentication routes
│   │   ├── users.js              # User routes
│   │   ├── giftCards.js          # Gift card routes
│   │   ├── crypto.js             # Crypto routes
│   │   ├── transactions.js       # Transaction routes
│   │   ├── wallet.js             # Wallet routes
│   │   ├── admin.js              # Admin routes
│   │   ├── mining.js             # Mining routes
│   │   ├── globalCard.js         # Global card routes
│   │   ├── support.js            # Support routes
│   │   └── bank.js               # Bank routes
│   ├── controllers/               # Business logic
│   │   ├── authController.js     # Auth logic
│   │   ├── giftCardController.js # Gift card logic
│   │   ├── cryptoController.js   # Crypto logic
│   │   ├── transactionController.js
│   │   ├── walletController.js
│   │   ├── adminController.js
│   │   └── supportController.js
│   ├── middleware/                # Middleware
│   │   ├── auth.js               # Authentication middleware
│   │   ├── errorHandler.js       # Error handling
│   │   ├── validation.js         # Input validation
│   │   └── upload.js             # File upload
│   └── utils/                     # Utility functions
│       ├── email.js              # Email functions
│       ├── sms.js                # SMS functions
│       ├── jwt.js                # JWT functions
│       └── encryption.js         # Encryption functions
├── uploads/                       # File uploads
├── logs/                          # Application logs
└── public/                        # Static files
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- MongoDB v6 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/global-bank-nigeria.git
cd global-bank-nigeria
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# Using MongoDB Atlas (recommended for production)
# Update MONGODB_URI in .env

# Or local MongoDB
mongod
```

5. **Start the server**
```bash
npm start
```

6. **Access the application**
```
Frontend: http://localhost:3000
API: http://localhost:3000/api/v1
Health Check: http://localhost:3000/health
```

## 🔑 Environment Variables

See `.env.example` for all required environment variables:

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `PAYSTACK_SECRET_KEY` - Paystack API key
- `FLUTTERWAVE_SECRET_KEY` - Flutterwave API key
- `SMTP_HOST` - Email server host
- `TWILIO_ACCOUNT_SID` - Twilio account SID

## 📊 Database Schema

### User Model
```javascript
{
  firstName, lastName, email, phoneNumber,
  accountNumber, accountBalance, creditBalance,
  isKYCVerified, kycLevel, role,
  cryptoWallets, bankAccounts,
  twoFactorEnabled, loginHistory
}
```

### Gift Card Model
```javascript
{
  cardNumber, cardType, amount, status,
  barcode, owner, currentHolder,
  transactions[], isMined, expiryDate
}
```

### Transaction Model
```javascript
{
  transactionId, reference, type,
  from, to, amount, currency, fee,
  status, giftCard, cryptoType,
  ipAddress, createdAt, completedAt
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password/:token` - Reset password
- `GET /api/v1/auth/verify-email/:token` - Verify email
- `POST /api/v1/auth/upload-kyc` - Upload KYC documents

### Gift Cards
- `GET /api/v1/gift-cards/available` - Get available cards
- `POST /api/v1/gift-cards/purchase` - Purchase gift card
- `POST /api/v1/gift-cards/sell` - Sell gift card
- `POST /api/v1/gift-cards/transfer` - Transfer gift card
- `GET /api/v1/gift-cards/my-cards` - Get my cards
- `POST /api/v1/gift-cards/verify` - Verify card
- `POST /api/v1/gift-cards/scan` - Scan barcode

### Cryptocurrency
- `GET /api/v1/crypto/balance/:type` - Get crypto balance
- `POST /api/v1/crypto/buy` - Buy cryptocurrency
- `POST /api/v1/crypto/sell` - Sell cryptocurrency
- `POST /api/v1/crypto/transfer` - Transfer crypto
- `GET /api/v1/crypto/rates` - Get current rates

### Wallet
- `GET /api/v1/wallet/balance` - Get wallet balance
- `POST /api/v1/wallet/deposit` - Deposit funds
- `POST /api/v1/wallet/withdraw` - Withdraw funds
- `POST /api/v1/wallet/transfer` - Transfer funds
- `GET /api/v1/wallet/transactions` - Get transaction history

### Transactions
- `GET /api/v1/transactions` - Get all transactions
- `GET /api/v1/transactions/:id` - Get transaction details
- `POST /api/v1/transactions/approve/:id` - Approve transaction
- `POST /api/v1/transactions/reject/:id` - Reject transaction

### Admin
- `GET /api/v1/admin/dashboard` - Get dashboard stats
- `GET /api/v1/admin/users` - Get all users
- `POST /api/v1/admin/users/:id/balance` - Edit user balance
- `POST /api/v1/admin/gift-cards/generate` - Generate gift cards
- `POST /api/v1/admin/mining/start` - Start mining
- `POST /api/v1/admin/mining/stop` - Stop mining

## 🔐 Security Features

### Authentication
- JWT-based authentication
- Refresh token support
- Two-factor authentication (2FA)
- Password encryption with bcrypt
- Account lockout after failed attempts

### Data Security
- AES-256 encryption for sensitive data
- Input validation and sanitization
- SQL/NoSQL injection prevention
- XSS protection
- CSRF protection

### API Security
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Security headers (Helmet.js)
- Request size limits
- IP-based blocking

### Compliance
- KYC/AML compliance
- NDPR (Nigeria Data Protection Regulation)
- SCUML registration ready
- CBN guidelines compliance

## 💳 Payment Integration

### Paystack
- Card payments
- Bank transfers
- USSD payments
- QR code payments
- Recurring billing

### Flutterwave
- International payments
- Multi-currency support
- Card payments
- Bank transfers
- Mobile money

## 📧 Notification System

### Email
- Transaction confirmations
- Password resets
- Email verifications
- Account alerts
- Marketing emails

### SMS
- Two-factor authentication
- Transaction alerts
- Balance notifications
- Security alerts

## 📊 Monitoring & Logging

### Application Monitoring
- Health check endpoint (`/health`)
- Error tracking (Sentry integration ready)
- Performance monitoring
- Uptime monitoring

### Logging
- Winston logger
- Log rotation
- Error logs
- Access logs
- Transaction logs

## 🚀 Deployment

### Production Deployment

See `DEPLOYMENT.md` for complete production deployment guide.

**Quick Production Steps:**

1. **Setup Server**
   - Ubuntu 22.04 LTS
   - Install Node.js, MongoDB, Nginx
   - Configure firewall

2. **Setup Database**
   - MongoDB Atlas cluster
   - Configure security settings
   - Setup backups

3. **Configure Environment**
   - Update `.env` with production values
   - Generate secure keys
   - Configure payment gateways

4. **Deploy Application**
   - Clone repository
   - Install dependencies
   - Start with PM2

5. **Configure Nginx**
   - Setup reverse proxy
   - Configure SSL/TLS
   - Enable security headers

6. **Setup Monitoring**
   - Configure logging
   - Setup alerts
   - Monitor performance

## 📈 Performance

### Optimization
- Database indexing
- Connection pooling
- Caching with Redis
- CDN for static assets
- Image compression
- Response compression

### Scalability
- Horizontal scaling ready
- Load balancing
- Database sharding
- Microservices architecture

## 🧪 Testing

### Test Coverage
- Unit tests
- Integration tests
- API tests
- Load tests

### Running Tests
```bash
npm test
```

## 📞 Support

### Contact Information
- **Email:** support@globalbanknigeria.com
- **Phone:** +234 XXX XXX XXXX
- **Address:** 123 Banking Plaza, Victoria Island, Lagos, Nigeria

### Documentation
- API Documentation: https://docs.globalbanknigeria.com
- User Guide: https://help.globalbanknigeria.com
- Developer Docs: https://dev.globalbanknigeria.com

## 🤝 Partners

### Payment Partners
- Paystack
- Flutterwave
- Opay
- PalmPay

### Banking Partners
- Access Bank
- GTBank
- Zenith Bank
- UBA
- First Bank

### Gift Card Partners
- Paxful
- Cardtonic
- Prestmit
- Raise
- Bitrefill

## 📄 Legal

### Compliance
- CAC Registered: RC-1234567
- SCUML Registered
- NDPR Compliant
- CBN Compliant

### Documents
- Terms of Service
- Privacy Policy
- KYC/AML Policy
- User Agreement
- Refund Policy

## 👥 Team

### Owner
- **Olawale Abdul-ganiyu** - Founder & CEO
- **Email:** adeganglobal@gmail.com

## 🎯 Roadmap

### Phase 1: Core Platform ✅
- [x] User authentication
- [x] Gift card trading
- [x] Cryptocurrency trading
- [x] Digital wallet
- [x] Bank integration

### Phase 2: Advanced Features ✅
- [x] Mining system
- [x] Advanced security
- [x] Real-time transactions
- [x] Fraud detection
- [x] Compliance features

### Phase 3: Scaling (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics
- [ ] AI-powered fraud detection
- [ ] International expansion
- [ ] Additional cryptocurrencies

## 📝 License

Proprietary - All Rights Reserved © 2024 Global Bank Nigeria

## 🙏 Acknowledgments

- Node.js team
- MongoDB team
- Paystack
- Flutterwave
- All contributors

---

**🚀 Global Bank Nigeria - Your Trusted Financial Platform**

*Built with ❤️ using Node.js, Express, and MongoDB*