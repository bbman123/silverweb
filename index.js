const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const APP_USERNAME = process.env.APP_USERNAME || 'admin';
const APP_PASSWORD = process.env.APP_PASSWORD || 'admin123';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'simple-receipt-app-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        },
    })
);

function requireAuth(req, res, next) {
    if (req.session && req.session.authenticated) {
        return next();
    }

    return res.redirect('/');
}

app.get('/', (req, res) => {
    if (req.session && req.session.authenticated) {
        return res.redirect('/dashboard');
    }

    return res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === APP_USERNAME && password === APP_PASSWORD) {
        req.session.authenticated = true;
        req.session.username = username;
        return res.redirect('/dashboard');
    }

    return res.status(401).render('login', {
        error: 'Invalid username or password.',
    });
});

app.post('/logout', requireAuth, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { 
        username: req.session.username,
        formData: req.session.formData || null
    });
});

app.post('/generate-receipt', requireAuth, (req, res) => {
    const { paymentType, amount, ...details } = req.body;

    const allowedStatuses = ['Settled', 'Pending'];
    if (!details.status || !allowedStatuses.includes(details.status)) {
        delete details.status;
    }
    
    // Store form data in session so it persists when user returns from receipt
    req.session.formData = { paymentType, amount, ...details };

    res.render('receipt', {
        paymentType,
        amount: amount || '0.00',
        details,
    });
});

// Export app for Netlify Functions (serverless)
module.exports = app;

// Only start the server when running locally (not in serverless environment)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}