const Task = require("../models/Task");

const taskAssigneeMiddleware = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (!task.assignedTo) {
      return res.status(403).json({
        success: false,
        message: "Task not assigned to anyone"
      });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only assigned user can access this task"
      });
    }

    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = taskAssigneeMiddleware;