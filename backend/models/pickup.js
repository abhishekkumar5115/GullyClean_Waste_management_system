const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'assigned', 'completed'], default: 'pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String },
    requestedDate: { type: Date, default: Date.now },
    scheduledFor: { type: Date },
    completedDate: { type: Date },
}, { timestamps: true });

const Pickup = mongoose.model('Pickup', pickupSchema);
module.exports = Pickup;