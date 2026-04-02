const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  code: { type: String, required: true },
  result: { type: String, required: true }, // "Passed", "Failed", "Error"
}, { timestamps: true });

module.exports = mongoose.model("Submission", SubmissionSchema);
