import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CodingChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/challenges/${id}`).then(res => {
      setChallenge(res.data);
      setCode(res.data.initialCode);
    }).catch(err => {
      console.error(err);
      setChallenge({
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        initialCode: "function twoSum(nums, target) {\n  // Write your code here\n}"
      });
      setCode("function twoSum(nums, target) {\n  // Write your code here\n}");
    });
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/challenges/execute`, { code, language: "javascript" });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      setResult({ status: "Error", output: "Failed to execute" });
    }
    setLoading(false);
  };

  if (!challenge) return <div className="text-center py-20 animate-pulse">Loading Environment...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[80vh]">
      <div className="w-full md:w-1/3 glass p-6 rounded-2xl flex flex-col h-full overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
          <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">Easy</span>
        </div>
        <div className="prose prose-invert border-t border-border pt-4">
          <p className="text-muted leading-relaxed">{challenge.description}</p>
        </div>
        
        {/* Result Area */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-auto p-4 rounded-xl border ${result.status === "Success" ? "border-success bg-success/10" : "border-danger bg-danger/10"}`}
          >
            <div className="flex items-center gap-2 mb-2 font-bold flex-1">
              {result.status === "Success" ? <CheckCircle className="text-success" /> : <XCircle className="text-danger" />}
              <span className={result.status === "Success" ? "text-success" : "text-danger"}>{result.status}</span>
            </div>
            <pre className="font-mono text-sm whitespace-pre-wrap">{result.output}</pre>
          </motion.div>
        )}
      </div>

      <div className="w-full md:w-2/3 glass rounded-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center bg-card p-4 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-danger"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="white" />} 
            Run Code
          </button>
        </div>
        <div className="flex-1 bg-[#1e1e1e] p-4">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              padding: { top: 16 }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
