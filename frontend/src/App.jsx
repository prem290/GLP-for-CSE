import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import QuizPage from "./pages/QuizPage";
import CodingChallenge from "./pages/CodingChallenge";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="/quiz/:subject" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/challenge/:id" element={<ProtectedRoute><CodingChallenge /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
