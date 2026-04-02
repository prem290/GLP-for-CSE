const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { users } = require("../mockDB");

const mockQuizzes = {
  DSA: [
    { id: 1, question: "What is the time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(log n)" },
    { id: 2, question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: "Stack" }
  ],
  DBMS: [
    { id: 3, question: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Structured Question Language", "System Query Language"], answer: "Structured Query Language" }
  ]
};

router.get("/:subject", (req, res) => {
  const { subject } = req.params;
  const questions = mockQuizzes[subject.toUpperCase()] || [];
  res.json(questions);
});

router.post("/submit", auth, (req, res) => {
  const { score, subject } = req.body;
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const xpEarned = score * 10;
  user.xp += xpEarned;
  
  // simple level up logic
  user.level = Math.floor(user.xp / 100) + 1;
  
  if (!user.badges.includes(`${subject} Rookie`) && score > 0) {
    user.badges.push(`${subject} Rookie`);
  }

  res.json({ message: "Score saved", xpEarned, newXp: user.xp, level: user.level, badges: user.badges });
});

module.exports = router;
