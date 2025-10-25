
const Member = require('../models/Member');

const getAllMembers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const members = await Member.find()
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 });

        const total = await Member.countDocuments();

        res.json({
            members,
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

const getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMember = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const member = new Member({ name, email });
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};