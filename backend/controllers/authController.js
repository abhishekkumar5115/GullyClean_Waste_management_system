const User = require('../models/User');
const {generateToken} = require('../services/authentication');



  
// @desc    Register a new user
const registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const userExists = await User.findOne({ email, phone });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = await User.create({ name, email, phone, password, role });
  if (user) {
    generateToken(res,user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Auth user & get token
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isMatch = await user.matchPassword(password);
  console.log('Entered:', password, 'Hashed:', user.password, 'Match:', isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = generateToken(res, user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });
};


// @desc    Logout user
const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};


// @desc    Get user profile
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// @desc    Update user profile
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all workers
const getWorkers = async (req, res) => {
    const workers = await User.find({ role: 'worker' }).select('-password');
    res.json(workers);
};

module.exports = { registerUser, loginUser, logoutUser, getMe, updateUserProfile, getWorkers };