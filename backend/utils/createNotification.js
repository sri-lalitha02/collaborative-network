const Notification = require("../models/Notification");
const { getIO } = require("../sockets/socket");

const createNotification = async ({
  recipient,
  title,
  message,
  type,
  relatedId,
}) => {

  const notification = await Notification.create({
    recipient,
    title,
    message,
    type,
    relatedId,
  });

  const io = getIO();

  io.to(recipient.toString()).emit(
    "newNotification",
    notification
  );

  return notification;
};

module.exports = createNotification;