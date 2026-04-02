const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  const challenges = [
    { id: 1, title: "Two Sum", subject: "DSA", difficulty: "Easy" },
    { id: 2, title: "Reverse Linked List", subject: "DSA", difficulty: "Medium" }
  ];
  // return as list
  res.json(challenges);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    initialCode: "function twoSum(nums, target) {\n  \n}",
  });
});

router.post("/execute", async (req, res) => {
  const { code, language } = req.body;
  // Dummy Judge0 Execution
  setTimeout(() => {
    res.json({
      status: "Success",
      output: "Output: [0, 1]\nAll test cases passed!"
    });
  }, 1000);
});

module.exports = router;
