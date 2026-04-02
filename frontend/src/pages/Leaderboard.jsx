import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

const API_URL = "http://localhost:5000/api";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/leaderboard`).then(res => {
      setUsers(res.data);
    }).catch(err => {
      console.error(err);
      setUsers([
        { id: 1, name: "Alice", xp: 5000, level: 20 },
        { id: 2, name: "Bob", xp: 4500, level: 18 },
        { id: 3, name: "Charlie", xp: 4200, level: 17 },
        { id: 4, name: "Test User", xp: 1200, level: 5 },
      ]);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Trophy className="mx-auto text-warning mb-4" size={48} />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warning to-accent">Global Leaderboard</h1>
        <p className="text-muted mt-2">Compete with the best and rise to the top!</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-card/50 text-sm font-semibold uppercase tracking-wider text-muted">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">User</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-right">XP</div>
        </div>

        <div className="flex flex-col">
          {users.sort((a, b) => b.xp - a.xp).map((user, i) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-border last:border-0 items-center transition-colors hover:bg-card/30 ${user.name === "Test User" ? "bg-primary/10 border-l-4 border-l-primary" : ""}`}
            >
              <div className="col-span-2 flex justify-center items-center">
                {i === 0 ? <Medal className="text-yellow-400" size={28} /> : 
                 i === 1 ? <Medal className="text-gray-300" size={24} /> : 
                 i === 2 ? <Medal className="text-amber-600" size={24} /> : 
                 <span className="font-bold text-xl text-muted">#{i + 1}</span>}
              </div>
              <div className="col-span-6 font-semibold flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                {user.name}
              </div>
              <div className="col-span-2 text-center font-medium bg-card px-2 py-1 rounded mx-auto border border-border">
                {user.level}
              </div>
              <div className="col-span-2 text-right font-mono font-bold text-primary">
                {user.xp.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
