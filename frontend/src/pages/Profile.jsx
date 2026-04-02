import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, Medal, Flame } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_URL = "http://localhost:5000/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/auth/me`).then(res => {
      setUser(res.data);
    }).catch(err => {
      setUser({ id: 1, name: "Test User", email: "test@example.com", xp: 1200, level: 5, streak: 3, badges: ["First Blood", "Code Master", "Bug Hunter"] });
    });
  }, []);

  if (!user) return <div className="text-center py-20 animate-pulse">Loading Profile...</div>;

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'XP Gained',
        data: [120, 190, 50, 200, 300, 150, 400],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { color: "#334155" } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="glass p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        
        <div className="w-32 h-32 rounded-full border-4 border-primary bg-card flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] z-10">
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
            {user.name.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
          <p className="text-muted mb-4">{user.email}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="px-4 py-2 bg-card rounded-xl border border-border flex items-center gap-2">
                <Medal className="text-primary" size={20} /> <span className="font-bold">Level {user.level}</span>
             </div>
             <div className="px-4 py-2 bg-card rounded-xl border border-border flex items-center gap-2">
                <Flame className="text-warning" size={20} /> <span className="font-bold">{user.streak} Day Streak</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Badges section */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Shield className="text-accent" /> Earned Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {user.badges.map((badge, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-4 rounded-2xl border border-border text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Medal className="mx-auto text-accent mb-2 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-all" size={32} />
                <p className="text-sm font-semibold">{badge}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Activity (XP)</h2>
          <div className="relative h-64 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
