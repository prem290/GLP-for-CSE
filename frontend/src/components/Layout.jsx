import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Trophy, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Subjects", path: "/subjects", icon: <BookOpen size={20} /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        CodeQuest
      </Link>
      <div className="flex gap-4 md:gap-6 items-center">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive ? "bg-primary/20 text-primary" : "text-muted hover:text-text hover:bg-card"
              }`}
            >
              {item.icon}
              <span className="hidden md:block font-medium">{item.name}</span>
            </Link>
          );
        })}
        {user && (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden md:block font-medium">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;
