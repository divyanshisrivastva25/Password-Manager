require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.js");

app.use(cookieParser());
app.use(express.json());

//MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// POST /api/signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed. Please try again later." });
  }
});


// POST /api/login
app.post("/api/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something is wrong ! ");

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.json("Yes you can login.");
    } else res.json("No you can't login!");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
