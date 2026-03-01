const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();


// Middleware setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'], // Allow frontend and admin portal to connect
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bins', require('./routes/binRoutes'));
app.use('/api/pickups', require('./routes/pickupRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/worker', require('./routes/workerRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Deployment Setup ---
// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // Serve the index.html file for any other requests
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// --------------------

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Triggering restart for Env vars