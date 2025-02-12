require('dotenv').config();
require('express-async-errors'); // Automatically catch async errors
const express = require('express');
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose')

//                   const authRoutes = require('./routes/auth');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3500

// Database Connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser

// Basic Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔌 Connected to port ${PORT}`);
  console.log(`📚 Database: ${process.env.MONGO_URI.includes('localhost') ? 'Local' : 'Cloud'}`);
});