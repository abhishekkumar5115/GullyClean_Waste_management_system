const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    binId: {type:String,required: true,unique:true},
    location: { type: String, required: true },
    status: { type: String, enum: ['empty', 'half-full', 'full'], default: 'empty' },
    lastEmptied: { type: Date },
}, { timestamps: true });

module.exports = mongoose.models.Bin || mongoose.model('Bin', binSchema);
