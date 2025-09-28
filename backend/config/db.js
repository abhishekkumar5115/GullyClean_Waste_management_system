const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the process if the connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;