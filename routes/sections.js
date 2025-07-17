const express = require("express");
const Section = require("../models/Section");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get all sections for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sections = await Section.find({ userId: req.user.id });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// create new section
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newSection = new Section({ userId: req.user.id, title });
    await newSection.save();

    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
