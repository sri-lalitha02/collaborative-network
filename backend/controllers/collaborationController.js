const Collaboration = require("../models/Collaboration");

// ================= SEND REQUEST =================
exports.sendRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    if (!sender || !receiver) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver are required",
      });
    }

    const request = await Collaboration.create({
      sender,
      receiver,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Collaboration request sent",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL REQUESTS =================
exports.getRequests = async (req, res) => {
  try {
    const requests = await Collaboration.find()
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PENDING REQUESTS =================
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Collaboration.find({ status: "Pending" })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ACCEPT REQUEST =================
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Collaboration.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "Accepted";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Request accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REJECT REQUEST =================
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Collaboration.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "Rejected";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Request rejected",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};