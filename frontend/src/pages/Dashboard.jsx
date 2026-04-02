import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Star, Trophy, ArrowRight } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Dummy fetch user details
    axios.get(`${API_URL}/auth/me`).then((res) => {
      setUser(res.data);
    }).catch(err => {
      console.error(err);
      // Fallback
      setUser({ id: 1, name: "Test User", xp: 1200, level: 5, streak: 3, badges: ["First Blood", "Code Master"] });
    });
  }, []);

  if (!user) return <div className="text-center py-20 animate-pulse">Loading...</div>;

  const xpProgress = (user.xp % 1000) / 10; // Assuming 1000xp per level

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-muted">Ready to crush some code today?</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-primary">
          <div className="p-3 bg-primary/20 rounded-full"><Star className="text-primary" /></div>
          <div>
            <p className="text-muted text-sm border-b border-border mb-1">Level {user.level}</p>
            <div className="font-bold text-2xl">{user.xp} <span className="text-sm font-normal text-muted">XP</span></div>
            <div className="w-full bg-border h-2 rounded-full mt-2 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }} transition={{ duration: 1 }} className="bg-primary h-full rounded-full" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-warning">
          <div className="p-3 bg-warning/20 rounded-full"><Flame className="text-warning" /></div>
          <div>
            <p className="text-muted text-sm mb-1">Current Streak</p>
            <div className="font-bold text-2xl">{user.streak} <span className="text-sm font-normal text-muted">Days</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-accent">
          <div className="p-3 bg-accent/20 rounded-full"><Trophy className="text-accent" /></div>
          <div>
            <p className="text-muted text-sm mb-1">Badges Earned</p>
            <div className="font-bold text-2xl">{user.badges.length}</div>
          </div>
        </motion.div>
      </div>

      <div className="glass rounded-2xl p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/subjects" className="p-4 rounded-xl bg-card border border-border flex justify-between items-center group hover:border-primary transition-colors">
            <div>
              <h3 className="font-semibold text-lg">Subjects Quiz</h3>
              <p className="text-muted text-sm">Test your CS core fundamentals</p>
            </div>
            <ArrowRight className="text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
          </Link>
          <Link to="/challenge/1" className="p-4 rounded-xl bg-card border border-border flex justify-between items-center group hover:border-accent transition-colors">
            <div>
              <h3 className="font-semibold text-lg">Coding Challenge</h3>
              <p className="text-muted text-sm">Solve practical problems</p>
            </div>
            <ArrowRight className="text-muted group-hover:text-accent transition-colors group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
