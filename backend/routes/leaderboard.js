const express = require("express");
const router = express.Router();
const { users } = require("../mockDB");

router.get("/", (req, res) => {
  // Combine some dummy high scores with actual registered users
  const dummyUsers = [
    { id: 'd1', name: "Alice", xp: 5000, level: 20 },
    { id: 'd2', name: "Bob", xp: 4500, level: 18 },
    { id: 'd3', name: "Charlie", xp: 4200, level: 17 }
  ];
  
  const allUsers = [...dummyUsers, ...users].map(u => ({
    id: u.id,
    name: u.name,
    xp: u.xp || 0,
    level: u.level || 1
  }));

  // Sort descending
  allUsers.sort((a, b) => b.xp - a.xp);
  
  res.json(allUsers);
});

module.exports = router;
