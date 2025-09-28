const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    location: { type: String, required: true },
    status: { type: String, enum: ['empty', 'half-full', 'full'], default: 'empty' },
    lastEmptied: { type: Date },
}, { timestamps: true });

const Bin = mongoose.model('Bin', binSchema);
module.exports = Bin;
