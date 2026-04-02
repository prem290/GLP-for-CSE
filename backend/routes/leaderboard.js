const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const leaderboard = [
    { id: 1, name: "Alice", xp: 5000, level: 20 },
    { id: 2, name: "Bob", xp: 4500, level: 18 },
    { id: 3, name: "Charlie", xp: 4200, level: 17 },
    { id: 4, name: "Test User", xp: 1200, level: 5 },
  ];
  res.json(leaderboard);
});

module.exports = router;
