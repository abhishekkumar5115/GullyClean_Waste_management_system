const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const User = require('./backend/models/user');
const Pickup = require('./backend/models/pickup');

async function check() {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/smartwaste');
  console.log('Connected to DB');
  
  const worker = await User.findOne({ email: 'worker@example.com' });
  if (!worker) {
    console.log('Worker not found');
    process.exit(1);
  }
  
  console.log('Worker found:', worker._id, worker.name);
  
  // Make sure to find at least one pickup to assign if they are all completed
  const allPickups = await Pickup.find({});
  if(allPickups.length === 0) {
     console.log('No pickups exist.');
  } else {
     const res = await Pickup.updateMany({}, { $set: { assignedTo: worker._id, status: 'pending' } });
     console.log('Updated pickups:', res.modifiedCount);
  }
  
  const tasks = await Pickup.find({ assignedTo: worker._id });
  console.log('Total tasks for worker:', tasks.length);
  
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
