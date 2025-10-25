const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    copies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, default: function() { return this.copies; } }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);