const Pickup = require('../models/pickup');
const Bin = require('../models/bin');
const User = require('../models/user');
const mongoose = require('mongoose');

// @desc    Create a new pickup request
const createPickup = async (req, res) => {
  const { binId, location, notes, citizenPhoto } = req.body;
  if (!binId) {
      return res.status(400).json({ message: 'binId is required' });
  }
  let bin = await Bin.findOne({binId:String(binId)});
  if(!bin) {
    bin = await Bin.create({
      binId:binId,
      location: location,
      status: "full"
    });
  }

  // Randomly assign to a worker automatically
  const workers = await User.find({ role: 'worker' });
  let assignedTo = null;
  let status = 'pending';
  
  if (workers.length > 0) {
    const randomWorker = workers[Math.floor(Math.random() * workers.length)];
    assignedTo = randomWorker._id;
    status = 'assigned';
  }

  const pickup = new Pickup({
    bin: bin._id,
    user: req.user._id,
    notes,
    location: location,
    citizenPhoto: citizenPhoto || null,
    status: status,
    assignedTo: assignedTo
  });
  
  // Change bin status to requested
  bin.status = 'requested';
  await bin.save();

  const createdPickup = await pickup.save();
  res.status(201).json(createdPickup);
};

// @desc    Get all pickup requests
const getAllPickups = async (req, res) => {
  const pickups = await Pickup.find({}).populate('user', 'name').populate('bin', 'location').populate('assignedTo', 'name');
  res.json(pickups);
};

// @desc    Get logged in user pickup requests
const getUserPickups = async (req, res) => {
    const pickups = await Pickup.find({ user: req.user._id }).populate('bin', 'location');
    res.json(pickups);
};

// @desc    Get a single pickup by ID
const getPickupById = async (req, res) => {
    const pickup = await Pickup.findById(req.params.id).populate('user', 'name email').populate('bin', 'location status');
    if (pickup) {
        res.json(pickup);
    } else {
        res.status(404).json({ message: 'Pickup not found' });
    }
};

// @desc    Assign a worker to a pickup
const assignPickup = async (req, res) => {
  const { workerId, scheduleDate } = req.body;
  const pickup = await Pickup.findById(req.params.id);
  if (pickup) {
    pickup.assignedTo = workerId;
    pickup.status = 'assigned';
    pickup.scheduledFor = scheduleDate;
    const updatedPickup = await pickup.save();
    res.json(updatedPickup);
  } else {
    res.status(404).json({ message: 'Pickup not found' });
  }
};

// @desc    Mark a pickup as complete
const completePickup = async (req, res) => {
  const pickup = await Pickup.findById(req.params.id);
  if (pickup) {
    pickup.status = 'completed';
    pickup.completedDate = Date.now();
    const updatedPickup = await pickup.save();
    res.json(updatedPickup);
  } else {
    res.status(404).json({ message: 'Pickup not found' });
  }
};

module.exports = { createPickup, getAllPickups, assignPickup, completePickup, getPickupById, getUserPickups };
