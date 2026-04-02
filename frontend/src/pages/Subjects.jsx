import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Database, Layout, Server, Network, Code } from "lucide-react";

const subjects = [
  { id: "dsa", name: "Data Structures & Algorithms", icon: <Code size={30} />, color: "text-blue-400" },
  { id: "dbms", name: "Database Management Systems", icon: <Database size={30} />, color: "text-green-400" },
  { id: "os", name: "Operating Systems", icon: <Layout size={30} />, color: "text-purple-400" },
  { id: "cn", name: "Computer Networks", icon: <Network size={30} />, color: "text-yellow-400" },
  { id: "oop", name: "Object-Oriented Programming", icon: <Server size={30} />, color: "text-pink-400" },
];

const Subjects = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Choose a Subject</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/quiz/${sub.id}`} className="block glass p-8 rounded-2xl card-hover text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`mb-4 flex justify-center ${sub.color}`}>
                <div className="p-4 bg-card rounded-full border border-border shadow-lg">
                  {sub.icon}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2 relative z-10">{sub.name}</h2>
              <p className="text-sm text-muted relative z-10">Test your knowledge and earn XP</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
