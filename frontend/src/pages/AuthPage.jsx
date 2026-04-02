import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-md w-full p-8 rounded-2xl relative"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        
        {error && <div className="p-3 mb-4 bg-danger/20 text-danger rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-muted">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:border-primary text-text" 
                required 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-muted">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:border-primary text-text" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted">Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:border-primary text-text" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? "Sign up here" : "Log in here"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
