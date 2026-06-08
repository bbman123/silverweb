const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // For simplicity, we're not implementing actual authentication
    // In a real application, you would validate credentials here
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.post('/generate-receipt', (req, res) => {
    const { paymentType, ...details } = req.body;
    res.render('receipt', { paymentType, details });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});