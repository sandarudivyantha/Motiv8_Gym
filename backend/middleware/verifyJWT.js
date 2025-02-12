const jwt = require("jsonwebtoken");

// Middleware to verify JSON Web Token (JWT)
const verifyJWT = (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if the authorization header exists and starts with 'Bearer '
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" }); // Return 401 if no valid token is found
  }

  // Extract the token from the header (removing 'Bearer ' prefix)
  const token = authHeader.split(" ")[1];

  // Verify the extracted token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET, // Secret key stored in environment variables
    (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" }); // Return 403 if token is invalid or expired

      // Attach user details to the request object for further use in protected routes
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;

      next(); // Move to the next middleware or route handler
    }
  );
};

module.exports = verifyJWT;
