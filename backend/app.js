require('dotenv').config();

const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const userModel = require('./models/user.js');

app.use(express.json()); 

//MongoDB Connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
