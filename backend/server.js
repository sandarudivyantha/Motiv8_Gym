require("dotenv").config();
require("express-async-errors"); // Automatically catch async errors
const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;
connectDB(); // Database Connection
const app = express(); // Initialize Express

// Middleware
app.use(logger); // Custom logger middleware for tracking requests
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

// Serve static files from the "public" directory
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use("/payments", require("./routes/paymentRoutes"));

// 404 Handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Global Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection Listeners
mongoose.connection.once("open", () => {
  console.log("📚 Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${process.env.NODE_ENV || PORT}`));
  logEvents('Connected to MongoDB Successfully', 'mongoConnLog.log'); 
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
