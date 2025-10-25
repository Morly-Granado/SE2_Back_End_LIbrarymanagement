const express = require('express');
const router = express.Router();
const {
    getAllLoans,
    createLoan,
    returnBook
} = require('../controllers/loanController');

router.get('/', getAllLoans);
router.post('/', createLoan);
router.patch('/:id/return', returnBook);

module.exports = router;