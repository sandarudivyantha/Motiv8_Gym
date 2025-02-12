require('dotenv').config(); 
require('express-async-errors'); // Automatically catch async errors
const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // Allow multiple origins
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200 // Preflight request status code
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Example Route
app.get('/example', async (req, res) => {
  // Simulate an async operation
  const data = await Promise.resolve({ message: 'Hello, world!' });
  res.json(data);
});

// Error Route (for testing error handling)
app.get('/error', (req, res, next) => {
  next(createError(404, 'This page does not exist!')); // Create a 404 error
});

// 404 Route (for unmatched routes)
app.use((req, res, next) => {
  next(createError(404, 'Endpoint not found'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined // Show stack trace in development
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔌 Connected to port ${PORT}`);
  console.log(`🌐 Allowed Origins: ${corsOptions.origin}`);
});