
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      if (!allowedRoles.includes(req.session.user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }
      
      next();
    };
  };
  
  module.exports = roleMiddleware;