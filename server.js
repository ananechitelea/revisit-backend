const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/auth')
app.use('/api/auth',authRoutes)

const sectionsRoutes = require("./routes/sections");
app.use("/api/sections", sectionsRoutes);

app.get("/", (req, res) => {
  res.send("Revisit backend is running...");
});

// connect to MongoDB Atlas + start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
