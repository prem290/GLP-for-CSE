const express = require("express");
const router = express.Router();

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

router.post("/submit", (req, res) => {
  const { score, subject } = req.body;
  // Dummy response
  res.json({ message: "Score saved", xpEarned: score * 10 });
});

module.exports = router;
