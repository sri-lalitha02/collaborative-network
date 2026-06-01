const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  userId,
  action,
  entityType,
  entityId
) => {
  await ActivityLog.create({
    user: userId,
    action,
    entityType,
    entityId,
  });
};

module.exports = logActivity;