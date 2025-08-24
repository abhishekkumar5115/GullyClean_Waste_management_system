const mongoose = require('mongoose');
const dbURL = process.env.MongoUrl 

module.exports = mongoose.connect(dbURL,{
     autoIndex: process.env.NODE_ENV !== 'production',
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));