const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');


const getAllLoans = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const loans = await Loan.find()
            .populate('memberId', 'name email')
            .populate('bookId', 'title author isbn')
            .skip(skip)
            .limit(limit)
            .sort({ loanedAt: -1 });

        const total = await Loan.countDocuments();

        res.json({
            loans,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createLoan = async (req, res) => {
    try {
        const { memberId, bookId } = req.body;
        
        if (!memberId || !bookId) {
            return res.status(400).json({ error: 'Member ID and Book ID are required' });
        }

        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        if (member.activeLoans >= 5) {
            return res.status(400).json({ error: 'Member has reached maximum loan limit' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if (book.availableCopies <= 0) {
            return res.status(400).json({ error: 'No available copies of this book' });
        }

        const dueAt = new Date();
        dueAt.setDate(dueAt.getDate() + 14);

        const loan = new Loan({
            memberId,
            bookId,
            dueAt
        });

        await loan.save();

        book.availableCopies -= 1;
        await book.save();

        member.activeLoans += 1;
        await member.save();

        await loan.populate('memberId', 'name email');
        await loan.populate('bookId', 'title author isbn');

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const returnBook = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id)
            .populate('bookId')
            .populate('memberId');

        if (!loan) {
            return res.status(404).json({ error: 'Loan record not found' });
        }

        if (loan.status === 'returned') {
            return res.status(400).json({ error: 'Book already returned' });
        }

        loan.returnedAt = new Date();
        loan.status = 'returned';
        await loan.save();

        loan.bookId.availableCopies += 1;
        await loan.bookId.save();

        loan.memberId.activeLoans -= 1;
        await loan.memberId.save();

        res.json({ message: 'Book returned successfully', loan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. MOST IMPORTANT: MAKE SURE THIS EXPORT EXISTS AT THE END!
module.exports = {
    getAllLoans,
    createLoan,
    returnBook
};