// require("dotenv").config();
// require("express-async-errors"); // Automatically catch async errors
// const express = require("express");
// const path = require("path");
// const { logger, logEvents } = require("./middleware/logger");
// const errorHandler = require("./middleware/errorHandler");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
// const connectDB = require("./config/dbConn");
// const mongoose = require("mongoose");
// //                   const authRoutes = require('./routes/auth');

// const PORT = process.env.PORT || 3500;
// connectDB(); // Database Connection
// const app = express(); // Initialize Express

// // Middleware
// console.log(process.env.NODE_ENV);
// app.use(logger);
// app.use(cors()); // Enable CORS
// app.use(cors(corsOptions));
// app.use(express.json()); // Body parser
// app.use(cookieParser());
// app.use(errorHandler);

// // // Basic Health Check
// // app.get('/health', (req, res) => {
// // res.json({ status: 'OK', timestamp: new Date() });
// // });

// app.use("/", express.static(path.join(__dirname, "public")));

// // Routes
// app.use("/", require("./routes/root"));

// // // Handle 404
// // app.use((req, res) => {
// //   res.status(404).json({ success: false, message: 'Endpoint not found' });
// // });

// // Error Handling Middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     success: false,
// //     message: 'Internal Server Error',
// //     error: process.env.NODE_ENV === 'development' ? err.message : undefined
// //   });
// // });

// // Start Server
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
// //   console.log(`🔌 Connected to port ${PORT}`);
// //   console.log(`📚 Database: ${process.env.MONGO_URI.includes('localhost') ? 'Local' : 'Cloud'}`);
// // });

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ message: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err);
//   logEvents(
//     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
//     "mongoErrLog.log"
//   );
// });


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
// const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3500;
connectDB(); // Database Connection
const app = express(); // Initialize Express

// Middleware
console.log(process.env.NODE_ENV);
app.use(logger);
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Body parser
app.use(cookieParser());

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
// app.use("/auth", authRoutes); // Uncomment if needed

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

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

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection Listeners
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});