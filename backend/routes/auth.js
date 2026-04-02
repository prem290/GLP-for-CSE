const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { users } = require("../mockDB");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Fill all fields" });
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { 
    id: users.length + 1, 
    name, 
    email, 
    password, 
    xp: 0, 
    level: 1, 
    streak: 0, 
    badges: [] 
  };
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id }, "secret123", { expiresIn: "1d" });
  res.json({ token, user: newUser });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "secret123", { expiresIn: "1d" });
  res.json({ token, user });
});

// Protected route to get current user data
router.get("/me", auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

module.exports = router;
