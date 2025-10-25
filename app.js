const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const loanRoutes = require('./routes/loans');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Library API running on port ${PORT}`));
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

