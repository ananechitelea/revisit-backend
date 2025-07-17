const express = require("express");
const Card = require("../models/Card");
const Section = require("../models/Section");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// get all cards in a section
router.get("/section/:sectionId", authMiddleware, async (req, res) => {
  try {
    const section = await Section.findOne({ _id: req.params.sectionId, userId: req.user.id });
    if (!section) return res.status(404).json({ message: "Section not found" });

    const cards = await Card.find({ sectionId: req.params.sectionId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// create a card (with file upload)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const section = await Section.findOne({ _id: sectionId, userId: req.user.id });
    if (!section) return res.status(404).json({ message: "Section not found" });

    const newCard = new Card({
      sectionId,
      title,
      description,
      imagePath,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
