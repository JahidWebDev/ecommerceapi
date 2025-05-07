const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.session?.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: No user session found" });
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

module.exports = authMiddleware;