const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: [
        "TEAM_INVITE",
        "PROJECT_ASSIGN",
        "TASK_ASSIGN",
        "COLLAB_REQUEST",
        "SYSTEM"
      ],
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
      // can point to Team / Project / Task / Request
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", notificationSchema);