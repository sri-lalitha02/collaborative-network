const adminMiddleware = (req, res, next) => {
  try {
    // Ensure user is logged in first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login first"
      });
    }

    // Check role safely
    const role = req.user.role;

    if (!role) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Role not assigned"
      });
    }

    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in admin middleware",
      error: error.message
    });
  }
};

module.exports = adminMiddleware;