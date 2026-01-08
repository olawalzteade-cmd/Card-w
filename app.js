// Global Bank Nigeria - Main JavaScript

// Global Variables
let currentPage = 'home';
let currentTab = {};
let miningActive = false;
let giftCardMiningActive = false;
let miningInterval = null;
let giftCardMiningInterval = null;

// Data Store
const dataStore = {
    users: [],
    transactions: [],
    giftCards: {
        amazon: [],
        itunes: [],
        google: [],
        apple: [],
        global: []
    },
    messages: [],
    cryptoBalances: {
        bitcoin: 0.025,
        ethereum: 0.5,
        'bitcoin-cash': 1.2,
        tron: 500,
        ton: 100
    },
    walletBalance: 1250000,
    adminWalletBalance: 12500
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadGiftCards();
    loadTransactions();
    loadMessages();
    setupEventListeners();
    updateDashboard();
}

// Page Navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    document.getElementById(pageName + '-page').style.display = 'block';
    
    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    currentPage = pageName;
    
    // Page specific initialization
    if (pageName === 'dashboard') {
        updateDashboard();
    } else if (pageName === 'gift-cards') {
        loadGiftCards();
    } else if (pageName === 'crypto') {
        updateCryptoBalances();
    }
}

// Tab Navigation
function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('#dashboard-page .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Hide all tab contents
    document.querySelectorAll('#dashboard-page .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function showGiftTab(tabName) {
    document.querySelectorAll('#gift-cards-page .tabs:first-of-type .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('#gift-cards-page > .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function showSendTab(tabName) {
    document.querySelectorAll('#send-receive-tab .tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('#send-receive-tab > .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function showCryptoTab(tabName) {
    document.querySelectorAll('#crypto-page .tabs:first-of-type .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('#crypto-page > .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function showCryptoAction(action, crypto) {
    document.querySelectorAll('#' + crypto + '-tab .tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('#' + crypto + '-tab > .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(crypto + '-' + action + '-action').classList.add('active');
}

function showGlobalTab(tabName) {
    document.querySelectorAll('#admin-global-card .tabs .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('#admin-global-card > .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById('global-' + tabName + '-tab').classList.add('active');
}

// Admin Section Navigation
function showAdminSection(sectionName) {
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    event.target.classList.add('active');
    document.getElementById('admin-' + sectionName).style.display = 'block';
}

// Dashboard Functions
function updateDashboard() {
    // Update stats
    const statCards = document.querySelectorAll('.stat-card .value');
    if (statCards.length >= 4) {
        statCards[0].textContent = '₦' + formatNumber(dataStore.walletBalance);
    }
}

// Gift Card Functions
function loadGiftCards() {
    const container = document.getElementById('available-cards');
    if (!container) return;
    
    const cardTypes = [
        { name: 'Amazon', class: 'amazon', amount: 100 },
        { name: 'iTunes', class: 'itunes', amount: 50 },
        { name: 'Google Play', class: 'google', amount: 25 },
        { name: 'Apple Store', class: 'apple', amount: 75 },
        { name: 'Global Card', class: 'global', amount: 500 }
    ];
    
    container.innerHTML = cardTypes.map(card => `
        <div class="gift-card ${card.class}">
            <div class="card-header">
                <span class="card-name">${card.name}</span>
            </div>
            <div class="card-amount">$${card.amount}</div>
            <div class="card-details">Valid: Instant</div>
            <div class="barcode">||| ||||| ||||</div>
        </div>
    `).join('');
}

// Card Verification
function verifyCard() {
    const cardInput = document.getElementById('verify-card-input').value.trim();
    const resultDiv = document.getElementById('verification-result');
    
    if (!cardInput) {
        showVerificationResult('Please enter a card number', 'invalid');
        return;
    }
    
    // Simulate verification process
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>Verifying card...</p></div>';
    
    setTimeout(() => {
        // Simulate random verification results
        const isValid = Math.random() > 0.3;
        const isUsed = isValid && Math.random() > 0.7;
        
        if (isValid && !isUsed) {
            const amount = [1, 2, 5, 10, 15, 20, 25, 50, 100, 500, 1000][Math.floor(Math.random() * 11)];
            showVerificationResult(`
                <h4>✓ Card is Valid</h4>
                <p><strong>Card Type:</strong> ${getCardType(cardInput)}</p>
                <p><strong>Amount:</strong> $${amount}</p>
                <p><strong>Status:</strong> Good - Not Used</p>
                <p><strong>Balance:</strong> $${amount} available</p>
            `, 'valid');
        } else if (isUsed) {
            showVerificationResult(`
                <h4>⚠ Card Already Used</h4>
                <p><strong>Card Type:</strong> ${getCardType(cardInput)}</p>
                <p><strong>Status:</strong> Used</p>
                <p><strong>Balance:</strong> $0.00</p>
            `, 'used');
        } else {
            showVerificationResult(`
                <h4>✗ Invalid Card</h4>
                <p><strong>Status:</strong> Fake or Invalid</p>
                <p>This card number is not recognized in our system.</p>
            `, 'invalid');
        }
    }, 2000);
}

function showVerificationResult(content, status) {
    const resultDiv = document.getElementById('verification-result');
    resultDiv.className = 'verification-result ' + status;
    resultDiv.innerHTML = content;
    resultDiv.style.display = 'block';
}

function getCardType(cardNumber) {
    const firstDigit = parseInt(cardNumber.charAt(0));
    if (firstDigit === 1) return 'Amazon';
    if (firstDigit === 2) return 'iTunes';
    if (firstDigit === 3) return 'Google Play';
    if (firstDigit === 4) return 'Apple Store';
    if (firstDigit === 5) return 'Global Card';
    return 'Unknown';
}

// Barcode Scanning
function startScan() {
    const scanResult = document.getElementById('scan-result');
    const scanDetails = document.getElementById('scan-details');
    
    // Simulate scanning
    alert('Camera activated. Position barcode within frame.');
    
    setTimeout(() => {
        const cardTypes = ['Amazon', 'iTunes', 'Google Play', 'Apple Store', 'Global Card'];
        const amounts = [1, 2, 5, 10, 15, 20, 25, 50, 100];
        const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
        const cardNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        scanDetails.innerHTML = `
            <strong>Card Type:</strong> ${randomCard}<br>
            <strong>Card Number:</strong> ${cardNumber}<br>
            <strong>Amount:</strong> $${randomAmount}<br>
            <strong>Status:</strong> Valid<br>
            <strong>Balance:</strong> $${randomAmount}
        `;
        scanResult.style.display = 'block';
    }, 3000);
}

function scanGlobalCard() {
    const resultDiv = document.getElementById('global-card-result');
    
    alert('Scanning Global Card...');
    
    setTimeout(() => {
        resultDiv.style.display = 'block';
    }, 2000);
}

// Mining Functions
function startMining() {
    if (miningActive) {
        alert('Mining is already active!');
        return;
    }
    
    miningActive = true;
    document.getElementById('mining-status').textContent = 'Active';
    document.getElementById('mining-status').style.color = '#48bb78';
    
    let minedAmount = 0;
    miningInterval = setInterval(() => {
        minedAmount += 0.0000001;
        updateMiningStats(minedAmount);
    }, 1000);
    
    alert('Cryptocurrency mining started!');
}

function stopMining() {
    if (!miningActive) {
        alert('Mining is not active!');
        return;
    }
    
    miningActive = false;
    clearInterval(miningInterval);
    document.getElementById('mining-status').textContent = 'Stopped';
    document.getElementById('mining-status').style.color = '#f56565';
    
    alert('Mining stopped!');
}

function updateMiningStats(amount) {
    const stats = document.querySelectorAll('.mining-stat .value');
    if (stats.length >= 2) {
        stats[1].textContent = amount.toFixed(7) + ' BTC';
    }
}

function startGiftCardMining() {
    if (giftCardMiningActive) {
        alert('Gift card mining is already active!');
        return;
    }
    
    giftCardMiningActive = true;
    document.getElementById('admin-mining-status').textContent = 'Active';
    document.getElementById('admin-mining-status').style.color = '#48bb78';
    
    let cardsMined = 0;
    let totalValue = 0;
    
    giftCardMiningInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            const amounts = [1, 2, 5, 10, 15, 20, 25, 50, 100, 500, 1000];
            const cardTypes = ['amazon', 'itunes', 'google', 'apple', 'global'];
            const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
            const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            
            cardsMined++;
            totalValue += randomAmount;
            dataStore.adminWalletBalance += randomAmount;
            
            // Add card to store
            const newCard = {
                id: generateCardId(),
                type: randomType,
                amount: randomAmount,
                status: 'available',
                createdAt: new Date().toISOString()
            };
            
            dataStore.giftCards[randomType].push(newCard);
            
            updateGiftCardMiningStats(cardsMined, totalValue);
        }
    }, 5000);
    
    alert('Gift card mining started!');
}

function stopGiftCardMining() {
    if (!giftCardMiningActive) {
        alert('Gift card mining is not active!');
        return;
    }
    
    giftCardMiningActive = false;
    clearInterval(giftCardMiningInterval);
    document.getElementById('admin-mining-status').textContent = 'Stopped';
    document.getElementById('admin-mining-status').style.color = '#f56565';
    
    alert('Gift card mining stopped!');
}

function updateGiftCardMiningStats(cardsMined, totalValue) {
    const stats = document.querySelectorAll('#admin-mining .mining-stat .value');
    if (stats.length >= 4) {
        stats[1].textContent = cardsMined;
        stats[2].textContent = '$' + totalValue.toFixed(2);
        stats[3].textContent = '$' + dataStore.adminWalletBalance.toFixed(2);
    }
}

// Transaction Functions
function loadTransactions() {
    const tableBody = document.getElementById('transaction-table');
    if (!tableBody) return;
    
    const transactions = [
        {
            id: 'TXN001234',
            date: '2024-01-15',
            type: 'Credit',
            description: 'Gift Card Sale - Amazon $100',
            amount: 75000,
            status: 'Completed'
        },
        {
            id: 'TXN001235',
            date: '2024-01-14',
            type: 'Debit',
            description: 'Bank Transfer Withdrawal',
            amount: -50000,
            status: 'Completed'
        },
        {
            id: 'TXN001236',
            date: '2024-01-13',
            type: 'Credit',
            description: 'Bitcoin Sale',
            amount: 125000,
            status: 'Pending'
        }
    ];
    
    tableBody.innerHTML = transactions.map(txn => `
        <tr>
            <td>${txn.id}</td>
            <td>${txn.date}</td>
            <td style="color: ${txn.type === 'Credit' ? '#48bb78' : '#f56565'};">${txn.type}</td>
            <td>${txn.description}</td>
            <td>₦${formatNumber(Math.abs(txn.amount))}</td>
            <td style="color: ${getStatusColor(txn.status)};">${txn.status}</td>
        </tr>
    `).join('');
}

function getStatusColor(status) {
    if (status === 'Completed') return '#48bb78';
    if (status === 'Pending') return '#ed8936';
    return '#f56565';
}

// Message Functions
function loadMessages() {
    // Messages are pre-loaded in HTML
}

// Modal Functions
function showModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if (type === 'add-card') {
        title.textContent = 'Add New Card Type';
        body.innerHTML = `
            <form id="add-card-form">
                <div class="form-group">
                    <label>Card Name</label>
                    <input type="text" required placeholder="Enter card name">
                </div>
                <div class="form-group">
                    <label>Card Type</label>
                    <select required>
                        <option value="">Select Type</option>
                        <option value="retail">Retail</option>
                        <option value="digital">Digital</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Supported Amounts ($)</label>
                    <input type="text" required placeholder="e.g., 1,2,5,10,25,50,100">
                </div>
                <button type="submit" class="btn btn-success">Add Card</button>
            </form>
        `;
    } else if (type === 'generate-cards') {
        title.textContent = 'Generate Gift Cards';
        body.innerHTML = `
            <form id="generate-cards-form">
                <div class="form-group">
                    <label>Card Type</label>
                    <select required>
                        <option value="">Select Card</option>
                        <option value="amazon">Amazon</option>
                        <option value="itunes">iTunes</option>
                        <option value="google">Google Play</option>
                        <option value="apple">Apple Store</option>
                        <option value="global">Global Card</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount ($)</label>
                    <select required>
                        <option value="">Select Amount</option>
                        <option value="1">$1</option>
                        <option value="5">$5</option>
                        <option value="10">$10</option>
                        <option value="25">$25</option>
                        <option value="50">$50</option>
                        <option value="100">$100</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" min="1" max="1000" value="10" required>
                </div>
                <button type="submit" class="btn btn-success">Generate Cards</button>
            </form>
        `;
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Crypto Functions
function updateCryptoBalances() {
    // Balances are displayed in HTML
}

function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        alert('Address copied to clipboard!');
    });
}

// Admin Balance Functions
function editUserBalance() {
    const accountNumber = document.getElementById('admin-account-number').value;
    const action = document.getElementById('admin-balance-action').value;
    const amount = parseFloat(document.getElementById('admin-balance-amount').value);
    const reason = document.getElementById('admin-balance-reason').value;
    
    if (!accountNumber || !amount || !reason) {
        alert('Please fill all fields');
        return;
    }
    
    // Simulate balance update
    const userName = 'John Doe';
    const currentBalance = 250000;
    
    document.getElementById('admin-user-name').value = userName;
    document.getElementById('admin-current-balance').value = '₦' + formatNumber(currentBalance);
    
    const newBalance = action === 'credit' ? currentBalance + amount : currentBalance - amount;
    
    alert(`Balance updated successfully!\n\nUser: ${userName}\nAction: ${action.toUpperCase()}\nAmount: ₦${formatNumber(amount)}\nReason: ${reason}\n\nNew Balance: ₦${formatNumber(newBalance)}`);
}

// Utility Functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function generateCardId() {
    return 'GC' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateTransactionId() {
    return 'TXN' + Date.now().toString(36).toUpperCase();
}

// Event Listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! Redirecting to dashboard...');
            showPage('dashboard');
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration successful! Please check your email to verify your account.');
            showPage('login');
        });
    }
    
    // Forgot password form
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Password reset link sent to your email!');
            showPage('login');
        });
    }
    
    // Admin balance form
    const adminBalanceForm = document.querySelector('#admin-balance form');
    if (adminBalanceForm) {
        adminBalanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            editUserBalance();
        });
    }
    
    // Account number lookup
    const accountNumberInput = document.getElementById('admin-account-number');
    if (accountNumberInput) {
        accountNumberInput.addEventListener('input', function() {
            if (this.value.length === 10) {
                // Simulate user lookup
                document.getElementById('admin-user-name').value = 'John Doe';
                document.getElementById('admin-current-balance').value = '₦250,000';
            }
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submissions for gift cards and crypto
    document.querySelectorAll('form').forEach(form => {
        if (!form.id) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formId = this.id;
            
            if (formId === 'add-card-form') {
                alert('New card type added successfully!');
                closeModal();
            } else if (formId === 'generate-cards-form') {
                alert('Gift cards generated successfully!');
                closeModal();
            } else if (formId.includes('buy') || formId.includes('sell') || formId.includes('send') || formId.includes('receive')) {
                alert('Transaction submitted successfully!');
            }
        });
    });
}

// Initialize
initializeApp();
console.log('Global Bank Nigeria - System Initialized');