const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Mock user data
const users = [];

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: users.length + 1, name, email, password, xp: 0, level: 1, streak: 0, badges: [] };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id }, "secret123", { expiresIn: "1d" });
  res.json({ token, user: newUser });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Dummy authentication
  const token = jwt.sign({ id: 1 }, "secret123", { expiresIn: "1d" });
  res.json({ 
    token, 
    user: { id: 1, name: "Test User", email, xp: 1200, level: 5, streak: 3, badges: ["First Blood", "Code Master"] } 
  });
});

router.get("/me", (req, res) => {
  res.json({ id: 1, name: "Test User", email: "test@test.com", xp: 1200, level: 5, streak: 3, badges: ["First Blood", "Code Master"] });
});

module.exports = router;
