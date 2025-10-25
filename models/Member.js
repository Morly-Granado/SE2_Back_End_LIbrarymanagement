const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joinedAt: { type: Date, default: Date.now },
    activeLoans: { type: Number, default: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);