require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.js");
const verifyUser = require("./middleware/verifyUser");
const Password = require("./models/password");
const cors = require("cors");


//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true              
}));
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route - dashboard
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
  if (!user) return res.status(400).json({ message: "Something is wrong ! " });

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign(
        { email: user.email, id: user._id.toString() },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      console.log(token);
      res.json({ message: "Login successful" });
      res.json({
        message: "Login successful",
        username: user.username,
      });
    } else return res.status(400).json({ message: "Invalid credentials" });
  });
});

//POST /api/logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "You are logged out" });
});

//protected function
app.get("/api/dashboard", verifyUser, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.email}`,
  });
});

//save password
app.post("/api/passwords", verifyUser, async (req, res) => {
  try {
    const { title, username, password } = req.body;

    const newPassword = await Password.create({
      userId: req.user.id,
      title,
      username,
      password,
    });

    res.status(201).json({ message: "Password saved", data: newPassword });
  } catch (err) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

//show all passwords
app.get("/api/passwords", verifyUser, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

//update password
app.put("/api/passwords/:id", verifyUser, async (req, res) => {
  try {
    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedPassword) {
      return res
        .status(404)
        .json({ message: "Password not found or unauthorized" });
    }

    res.json({ message: "Password updated", data: updatedPassword });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

//delete password
app.delete("/api/passwords/:id", verifyUser, async (req, res) => {
  try {
    const deletedPassword = await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedPassword) {
      return res
        .status(404)
        .json({ message: "Password not found or unauthorized" });
    }

    res.json({ message: "Password deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
