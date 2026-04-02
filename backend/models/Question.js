const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  difficulty: { type: String, required: true },
  type: { type: String, enum: ["quiz", "challenge"], required: true },
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ]
});

module.exports = mongoose.model("Question", QuestionSchema);
