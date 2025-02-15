// Middleware to verify user roles
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
      // Check if the request has user roles
      if (!req?.roles) {
        return res.status(401).json({ message: "Unauthorized: No roles found" });
      }
  
      // Check if the user has any of the allowed roles
      const hasAccess = req.roles.some((role) => allowedRoles.includes(role));
  
      if (!hasAccess) {
        return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
      }
  
      // If the user has the required role, proceed to the next middleware or route handler
      next();
    };
  };
  
  module.exports = verifyRoles;