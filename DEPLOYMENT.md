# Global Bank Nigeria - Production Deployment Guide

## 🚀 Production Deployment Checklist

### 1. Prerequisites

Before deploying to production, ensure you have:

- ✅ Domain name registered (e.g., globalbanknigeria.com)
- ✅ SSL/TLS certificates (Let's Encrypt or commercial)
- ✅ MongoDB Atlas cluster (production tier)
- ✅ Email service (SendGrid, Mailgun, or AWS SES)
- ✅ SMS service (Twilio or AWS SNS)
- ✅ Payment gateways (Paystack, Flutterwave) - Production accounts
- ✅ Server hosting (AWS EC2, DigitalOcean, or Heroku)
- ✅ CDN for static assets (CloudFront, Cloudflare)
- ✅ Monitoring and logging (Sentry, DataDog, or AWS CloudWatch)
- ✅ Backup strategy (database backups, file storage)

### 2. Server Configuration

#### System Requirements
- **OS:** Ubuntu 22.04 LTS or later
- **RAM:** Minimum 4GB (Recommended 8GB)
- **CPU:** Minimum 2 cores (Recommended 4 cores)
- **Storage:** Minimum 50GB SSD
- **Node.js:** v18.x or later
- **MongoDB:** v6.x or later

#### Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB tools
sudo apt install -y mongodb-clients

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install SSL certificate tool
sudo apt install -y certbot python3-certbot-nginx
```

### 3. Environment Configuration

#### Production Environment Variables

```bash
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database Configuration
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/globalbanknigeria?retryWrites=true&w=majority

# JWT Configuration (Generate secure random strings)
JWT_SECRET=your_very_secure_jwt_secret_key_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_very_secure_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# Encryption Keys (Generate secure keys)
ENCRYPTION_KEY=your_32_character_encryption_key_here
IV_KEY=your_16_character_iv_key_here

# Paystack Production Keys
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxx

# Flutterwave Production Keys
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_xxxxxxxxxxxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_xxxxxxxxxxxxxx
FLUTTERWAVE_ENCRYPTION_KEY=FLWSECK_xxxxxxxxxxxxxx

# Email Configuration (Use production SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxx
SMTP_FROM=noreply@globalbanknigeria.com

# SMS Configuration (Twilio Production)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+234XXXXXXXXXX

# Admin Configuration
ADMIN_EMAIL=admin@globalbanknigeria.com
ADMIN_PASSWORD=very_secure_admin_password_here
ADMIN_NAME=Olawale Abdul-ganiyu

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=/var/log/globalbanknigeria

# API Configuration
API_VERSION=v1
API_PREFIX=/api/v1
```

### 4. Database Setup

#### MongoDB Atlas Configuration

1. **Create MongoDB Atlas Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a new cluster (Production tier: M30 or higher)
   - Choose region closest to your users (e.g., AWS us-east-1)
   - Enable backup and auto-scaling

2. **Configure Network Access**
   - Add server IP to whitelist
   - Enable VPC peering if using AWS
   - Set up private endpoints for enhanced security

3. **Database Security**
   - Enable authentication
   - Create database user with strong password
   - Enable encryption at rest
   - Enable audit logging

4. **Create Indexes**
   ```javascript
   // Connect to MongoDB
   mongo "mongodb+srv://user:pass@cluster.mongodb.net/globalbanknigeria"

   // Create indexes for better performance
   db.users.createIndex({ email: 1 }, { unique: true })
   db.users.createIndex({ accountNumber: 1 }, { unique: true })
   db.giftcards.createIndex({ cardNumber: 1 }, { unique: true })
   db.transactions.createIndex({ transactionId: 1 }, { unique: true })
   ```

### 5. Payment Gateway Setup

#### Paystack Production Account

1. **Sign up for Paystack**
   - Go to https://paystack.co
   - Create a business account
   - Complete business verification
   - Submit required documents (CAC, ID, proof of address)

2. **Get API Keys**
   - Navigate to Settings > API Keys
   - Copy Public Key and Secret Key
   - Enable webhook notifications

3. **Configure Webhook**
   - Set webhook URL: `https://globalbanknigeria.com/api/v1/webhooks/paystack`
   - Enable events: charge.success, transfer.success, transfer.failed

#### Flutterwave Production Account

1. **Sign up for Flutterwave**
   - Go to https://flutterwave.com
   - Create a merchant account
   - Complete KYC verification
   - Submit business documents

2. **Get API Keys**
   - Navigate to Settings > API Keys
   - Copy Public Key, Secret Key, and Encryption Key
   - Enable webhook notifications

3. **Configure Webhook**
   - Set webhook URL: `https://globalbanknigeria.com/api/v1/webhooks/flutterwave`
   - Enable all relevant events

### 6. Email & SMS Setup

#### Email Service (SendGrid)

1. **Create SendGrid Account**
   - Go to https://sendgrid.com
   - Create account and verify sender email
   - Obtain API Key

2. **Configure Email Templates**
   - Create transactional email templates
   - Set up sender authentication (SPF, DKIM)
   - Configure bounce and complaint handling

#### SMS Service (Twilio)

1. **Create Twilio Account**
   - Go to https://www.twilio.com
   - Purchase a Nigerian phone number
   - Obtain Account SID and Auth Token

2. **Configure SMS Templates**
   - Set up verification codes
   - Configure transaction alerts
   - Set up two-factor authentication

### 7. Application Deployment

#### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/global-bank-nigeria.git
cd global-bank-nigeria

# Install dependencies
npm install --production
```

#### Step 2: Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Edit environment file with production values
nano .env
```

#### Step 3: Build and Start

```bash
# Create logs directory
mkdir -p logs

# Start application with PM2
pm2 start server.js --name globalbanknigeria --max-memory-restart 500M

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
```

#### Step 4: Configure Nginx

```nginx
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/globalbanknigeria

# Add following configuration:
server {
    listen 80;
    server_name globalbanknigeria.com www.globalbanknigeria.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name globalbanknigeria.com www.globalbanknigeria.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/globalbanknigeria.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/globalbanknigeria.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Static Files
    location / {
        root /var/www/globalbanknigeria/public;
        try_files $uri $uri/ /index.html;
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File Uploads
    client_max_body_size 10M;
}

# Enable site
sudo ln -s /etc/nginx/sites-available/globalbanknigeria /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 5: Setup SSL Certificate

```bash
# Obtain SSL certificate from Let's Encrypt
sudo certbot --nginx -d globalbanknigeria.com -d www.globalbanknigeria.com

# Setup auto-renewal
sudo certbot renew --dry-run
```

### 8. Security Hardening

#### Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Block common attack patterns
sudo ufw deny from 0.0.0.0/0 to any port 3000  # Block direct access to Node.js
```

#### Application Security

1. **Enable Security Headers**
   - Helmet.js already configured
   - Additional headers in Nginx

2. **Rate Limiting**
   - Already configured in Express
   - Additional rate limiting at Nginx level

3. **Input Validation**
   - All inputs validated using express-validator
   - Sanitization of user inputs

4. **SQL/NoSQL Injection Prevention**
   - Using Mongoose (prevents NoSQL injection)
   - Parameterized queries

5. **XSS Protection**
   - Input sanitization
   - Output encoding
   - Content Security Policy

### 9. Monitoring and Logging

#### Application Monitoring

1. **Setup Monitoring**
   ```bash
   # Install monitoring tools
   npm install --save @sentry/node
   
   # Configure Sentry
   # Add to server.js
   const Sentry = require("@sentry/node");
   
   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: "production",
   });
   ```

2. **Logging Configuration**
   ```bash
   # Setup log rotation
   sudo nano /etc/logrotate.d/globalbanknigeria
   
   # Add:
   /var/log/globalbanknigeria/*.log {
       daily
       missingok
       rotate 14
       compress
       delaycompress
       notifempty
       create 0640 www-data www-data
       sharedscripts
   }
   ```

3. **Health Checks**
   - Endpoint: `/health`
   - Monitor database connection
   - Monitor server uptime
   - Monitor response times

### 10. Backup Strategy

#### Database Backups

1. **Automated Daily Backups**
   ```bash
   # Create backup script
   nano /home/scripts/backup-mongodb.sh
   
   # Add:
   #!/bin/bash
   mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/globalbanknigeria" --out=/backup/mongodb/$(date +%Y%m%d)
   
   # Make executable
   chmod +x /home/scripts/backup-mongodb.sh
   
   # Add to crontab (daily at 2 AM)
   crontab -e
   # Add: 0 2 * * * /home/scripts/backup-mongodb.sh
   ```

2. **Off-site Backup**
   - Upload backups to AWS S3
   - Keep backups for 30 days
   - Test restore process regularly

#### File Storage Backup

1. **Uploads Directory**
   - Sync to AWS S3 or similar
   - Use CloudFront for CDN
   - Implement versioning

### 11. Performance Optimization

#### Caching Strategy

1. **Redis Caching**
   ```bash
   # Install Redis
   sudo apt install redis-server
   
   # Configure Redis
   sudo nano /etc/redis/redis.conf
   
   # Enable caching in application
   npm install redis
   ```

2. **CDN Configuration**
   - Use CloudFront or Cloudflare
   - Cache static assets
   - Enable gzip compression

#### Database Optimization

1. **Index Optimization**
   - Ensure all indexes are created
   - Monitor slow queries
   - Optimize aggregation pipelines

2. **Connection Pooling**
   - Configure MongoDB connection pool
   - Monitor connection usage
   - Adjust pool size as needed

### 12. Testing and Validation

#### Pre-Deployment Testing

1. **Security Testing**
   ```bash
   # Run security audit
   npm audit
   npm audit fix
   
   # Test with OWASP ZAP
   # Perform penetration testing
   ```

2. **Load Testing**
   ```bash
   # Install load testing tool
   npm install -g artillery
   
   # Run load test
   artillery run load-test.yml
   ```

3. **Integration Testing**
   ```bash
   # Run all tests
   npm test
   
   # Test payment gateways
   # Test email delivery
   # Test SMS delivery
   ```

#### Production Validation

1. **Smoke Tests**
   - Test all critical endpoints
   - Test user registration and login
   - Test transaction processing
   - Test payment gateway integration

2. **UAT (User Acceptance Testing)**
   - Test with small user group
   - Monitor for issues
   - Collect feedback
   - Make adjustments

### 13. Post-Deployment Tasks

#### Initial Setup

1. **Create Admin Account**
   ```bash
   # Admin account created automatically
   # Change default password immediately
   ```

2. **Configure Business Settings**
   - Set business information
   - Configure gift card types
   - Set exchange rates
   - Configure transaction limits

3. **Test All Features**
   - User registration
   - KYC verification
   - Gift card trading
   - Cryptocurrency trading
   - Bank transfers
   - Withdrawals

4. **Monitor Initial Traffic**
   - Watch for errors
   - Monitor performance
   - Check transaction processing
   - Monitor payment gateway responses

#### Ongoing Maintenance

1. **Daily Tasks**
   - Check application logs
   - Monitor server resources
   - Review failed transactions
   - Check payment gateway status

2. **Weekly Tasks**
   - Review security logs
   - Update dependencies
   - Test backup restoration
   - Review performance metrics

3. **Monthly Tasks**
   - Security audit
   - Performance review
   - Cost analysis
   - Compliance check

4. **Quarterly Tasks**
   - Disaster recovery testing
   - Security penetration testing
   - Business continuity review
   - Regulatory compliance review

### 14. Compliance and Legal

#### Regulatory Requirements

1. **CAC Registration**
   - Verify business registration
   - Update any changes
   - File annual returns

2. **SCUML Registration**
   - Register as financial institution
   - File required reports
   - Maintain compliance

3. **NDPR Compliance**
   - Implement data protection measures
   - Conduct privacy impact assessment
   - File annual compliance report

4. **CBN Regulations**
   - Comply with all CBN guidelines
   - File required reports
   - Maintain capital requirements

#### Legal Documents

- ✅ Terms of Service reviewed by legal counsel
- ✅ Privacy Policy compliant with NDPR
- ✅ KYC/AML policy implemented
- ✅ User agreements finalized
- ✅ Partnership agreements signed

### 15. Support and Incident Response

#### Support Channels

1. **Customer Support**
   - Email: support@globalbanknigeria.com
   - Phone: +234 XXX XXX XXXX
   - Live chat on website

2. **Technical Support**
   - 24/7 monitoring
   - Automated alerts
   - On-call rotation

#### Incident Response Plan

1. **Security Incident**
   - Immediate response team activation
   - Contain the incident
   - Preserve evidence
   - Notify stakeholders
   - Implement fixes
   - Post-incident review

2. **Service Outage**
   - Automatic failover
   - Load balancing
   - Database replication
   - Status page updates
   - Customer communication

### 16. Cost Estimation

#### Monthly Operational Costs

| Service | Est. Cost (NGN) |
|---------|----------------|
| Server (AWS EC2) | ₦25,000 |
| Database (MongoDB Atlas) | ₦40,000 |
| Email (SendGrid) | ₦15,000 |
| SMS (Twilio) | ₦10,000 |
| CDN (CloudFront) | ₦5,000 |
| Domain & SSL | ₦2,000 |
| Monitoring (Sentry) | ₦10,000 |
| Backup Storage | ₦5,000 |
| **Total** | **₦112,000/month** |

#### Payment Gateway Fees

- Paystack: 1.5% + ₦100 per transaction
- Flutterwave: 1.4% + ₦100 per transaction
- Withdrawal fees: ₦50-₦500 depending on amount

### 17. Success Metrics

#### Key Performance Indicators (KPIs)

1. **Technical Metrics**
   - Uptime: 99.9%+
   - Response time: <200ms
   - Error rate: <0.1%
   - Transaction success rate: >99%

2. **Business Metrics**
   - Daily active users
   - Transaction volume
   - Revenue growth
   - Customer satisfaction

3. **Security Metrics**
   - Failed login attempts
   - Fraud detection rate
   - Compliance violations
   - Security incidents

---

## 📞 Support

For deployment assistance:
- Email: support@globalbanknigeria.com
- Phone: +234 XXX XXX XXXX
- Documentation: https://docs.globalbanknigeria.com

---

**Deployment Checklist Complete - Ready for Production Launch! 🚀**