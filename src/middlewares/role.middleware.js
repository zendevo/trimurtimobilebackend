const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("req role", req.user);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export default roleMiddleware;
