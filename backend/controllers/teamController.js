const Team = require("../models/Team");

// ================= CREATE TEAM =================
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL =================
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET BY ID =================
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= JOIN TEAM =================
exports.joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.members.some(m => m.toString() === req.user._id.toString())) {
      team.members.push(req.user._id);
    }

    await team.save();

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LEAVE TEAM =================
exports.leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    team.members = team.members.filter(
      (m) => m.toString() !== req.user._id
    );

    await team.save();

    res.json({ message: "Left team successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADD MEMBER =================
exports.addMember = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.members.includes(req.body.userId)) {
      team.members.push(req.body.userId);
    }

    await team.save();

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= REMOVE MEMBER =================
exports.removeMember = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    team.members = team.members.filter(
      (m) => m.toString() !== req.body.userId
    );

    await team.save();

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};