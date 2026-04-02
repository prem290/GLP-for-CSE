import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Brain, Trophy, ChevronRight } from "lucide-react";

const Landing = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-4xl"
      >
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Level Up Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Coding Skills
          </span>
        </motion.h1>
        
        <motion.p variants={item} className="text-xl text-muted mb-10 max-w-2xl mx-auto">
          The ultimate gamified learning platform for CSE students. Master Data Structures, Algorithms, DBMS, and more through interactive challenges.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 justify-center mb-20">
          <Link to="/dashboard" className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            Start Learning <ChevronRight size={20} />
          </Link>
          <button className="px-8 py-4 glass text-text rounded-full font-semibold hover:bg-card/80 transition-transform hover:scale-105">
            Log In
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            { icon: <Code2 className="text-primary mb-4" size={32} />, title: "Interactive Coding", desc: "Solve real-world problems with our built-in code editor." },
            { icon: <Brain className="text-accent mb-4" size={32} />, title: "Smart Quizzes", desc: "Test your knowledge across various CS fundamentals." },
            { icon: <Trophy className="text-warning mb-4" size={32} />, title: "Gamified Progress", desc: "Earn XP, badges, and climb the leaderboard." },
          ].map((feature, i) => (
            <motion.div key={i} variants={item} className="glass p-6 rounded-2xl card-hover relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
