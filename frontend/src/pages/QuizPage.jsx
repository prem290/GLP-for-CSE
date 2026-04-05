import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : `http://${window.location.hostname}:5000/api`);

const QuizPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    // Fetch quiz from mock API
    axios.get(`${API_URL}/quiz/${subject}`).then(res => {
      setQuestions(res.data);
    }).catch(err => {
      console.error(err);
      // Dummy data fallback
      setQuestions([
        { id: 1, question: `What is a core concept of ${subject.toUpperCase()}?`, options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A" },
        { id: 2, question: "Another tricky question?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option B" }
      ]);
    });
  }, [subject]);

  useEffect(() => {
    if (finished || questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleNext();
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQIndex, finished, questions]);

  const handleNext = () => {
    if (questions[currentQIndex].answer === selectedOption) {
      setScore(s => s + 1);
    }
    setSelectedOption(null);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setTimeLeft(15);
    } else {
      setFinished(true);
      axios.post(`${API_URL}/quiz/submit`, { score: score + (questions[currentQIndex].answer === selectedOption ? 1 : 0), subject }).catch(console.error);
    }
  };

  if (questions.length === 0) return <div className="text-center py-20 animate-pulse">Loading Quiz...</div>;

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-12 text-center rounded-3xl max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
          <p className="text-xl mb-6">You scored <span className="text-primary font-bold">{score}</span> out of {questions.length}</p>
          <div className="w-full bg-border h-4 rounded-full mb-8 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(score/questions.length)*100}%` }} transition={{ duration: 1 }} className="bg-success h-full rounded-full" />
          </div>
          <button onClick={() => navigate("/subjects")} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors w-full">
            Back to Subjects
          </button>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <div className="flex justify-between items-center mb-6">
        <span className="text-muted font-medium uppercase tracking-wider">{subject} Quiz</span>
        <div className="flex items-center gap-4">
          <span className="text-sm">Question {currentQIndex + 1}/{questions.length}</span>
          <div className={`px-4 py-1 rounded-full font-bold ${timeLeft <= 5 ? "bg-danger text-white animate-pulse" : "glass"}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="w-full bg-border h-2 rounded-full mb-8">
        <motion.div 
          className="bg-primary h-full rounded-full"
          animate={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold mb-8">{q.question}</h2>
          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(opt)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedOption === opt 
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                    : "border-border bg-card hover:border-muted"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {currentQIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
