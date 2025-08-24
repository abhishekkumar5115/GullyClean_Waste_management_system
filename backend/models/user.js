const {model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');
const { generateToken} = require('../services/authentication');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    salt:   {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        sparse:true
    },
    phone: {
        type: String,
        unique: true,
        sparse:true
    },
    role:{
        type: String,
        enum: ['admin', 'citizen','worker'],
        default: 'citizen',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

// Pre-save hook to hash password and generate salt
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        user.salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, user.salt);
        next();
    }
    catch(err){
        console.error('Error hashing password:', err);
        next(err);
    }
})

// Method to compare password
userSchema.static("matchpassword",  async function ({email, phone, password}) {
    const user = await this.findOne({
        $or: [
            email ? {email} : null,
            phone ? {phone} : null  
        ].filter(Boolean)
    });
    if(!user) throw new Error('User not found')
        // Compare the provided password with the hashed password;
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid password');

    const token = generateToken(user);
    return token;
})

const User = model('User', userSchema);

module.exports = User;
