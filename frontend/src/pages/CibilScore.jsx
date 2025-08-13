import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dock from "../components/Dock";
import { Home, User, HelpCircle, LogOut } from "lucide-react";
import authService from "../services/authService";
import api from "../services/api";
const SCORE_CONFIG = {
  MIN: 300,
  MAX: 900,
  RADIUS: 80,
  ARC_PERCENTAGE: 0.75,
};
const CreditGauge = React.memo(
  ({ score, changeAmount = 0, changeDirection = "down" }) => {
    const percentage = useMemo(() => {
      return Math.min(
        Math.max(
          (score - SCORE_CONFIG.MIN) / (SCORE_CONFIG.MAX - SCORE_CONFIG.MIN),
          0,
        ),
        1,
      );
    }, [score]);
    const circumference = useMemo(() => 2 * Math.PI * SCORE_CONFIG.RADIUS, []);
    const strokeDashoffset = useMemo(() => {
      return (
        circumference *
        (SCORE_CONFIG.ARC_PERCENTAGE - percentage * SCORE_CONFIG.ARC_PERCENTAGE)
      );
    }, [circumference, percentage]);
    return (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg
          className="w-full h-full transform rotate-[135deg]"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r={SCORE_CONFIG.RADIUS}
            fill="none"
            stroke="#1e2a30"
            strokeWidth="15"
            strokeDasharray="4 4"
            strokeLinecap="round"
            className="opacity-50"
            style={{ strokeDashoffset: circumference * 0.25 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r={SCORE_CONFIG.RADIUS}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="15"
            strokeDasharray="4 4"
            strokeLinecap="round"
            className="transform origin-center transition-all duration-1000 ease-out"
            initial={{
              strokeDashoffset: circumference * SCORE_CONFIG.ARC_PERCENTAGE,
            }}
            animate={{ strokeDashoffset }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold text-white tracking-widest"
          >
            {score}
          </motion.div>
          {changeAmount !== 0 && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs ${changeDirection === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {changeDirection === "up" ? "▲" : "▼"}
              </span>
              <span
                className={`text-xs ${changeDirection === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {Math.abs(changeAmount)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
CreditGauge.displayName = "CreditGauge";
const CibilScore = () => {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const userName = useMemo(() => user?.name?.split(" ")[0] || "User", [user]);
  const [scoreData, setScoreData] = useState({
    score: user?.cibilScore || 750,
    comment: "Good",
    emoji: "👍",
    changeAmount: 0,
    changeDirection: "down",
    loading: true,
    error: null,
  });
  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigate]);
  const dockItems = useMemo(
    () => [
      {
        icon: <Home size={24} />,
        label: "Home",
        onClick: () => navigate("/dashboard"),
      },
      {
        icon: <User size={24} />,
        label: "Profile",
        onClick: () => console.log("Profile"),
      },
      {
        icon: <HelpCircle size={24} />,
        label: "Support",
        onClick: () => console.log("Support"),
      },
      { icon: <LogOut size={24} />, label: "Logout", onClick: handleLogout },
    ],
    [navigate, handleLogout],
  );
  useEffect(() => {
    const fetchCibilScore = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/");
        return;
      }
      try {
        const { data } = await api.get("/cibil/score");
        setScoreData({
          score: data.cibilScore,
          comment: data.comment,
          emoji: data.emoji,
          changeAmount: Math.abs(data.changeAmount),
          changeDirection: data.changeAmount < 0 ? "down" : "up",
          loading: false,
          error: null,
        });
        const parsedUser = JSON.parse(storedUser);
        const updatedUser = { ...parsedUser, cibilScore: data.cibilScore };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          navigate("/");
          return;
        }
        setScoreData((prev) => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message || "Failed to fetch CIBIL score",
        }));
      }
    };
    fetchCibilScore();
  }, [navigate]);
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  }, []);
  if (scoreData.error) {
    return (
      <div className="h-screen w-full bg-[#060D0C] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{scoreData.error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-[#49BFBE] text-black rounded-full hover:bg-[#3aa9a8] transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen w-full bg-[#060D0C] text-white font-display overflow-hidden selection:bg-[#49BFBE] selection:text-black flex flex-col">
      <div className="w-full h-16 flex items-center justify-between px-6 md:px-12 py-4 shrink-0">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src="/mascot.png"
            alt="CredLo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-[#49BFBE] font-bold text-xl font-amiko tracking-widest">
            CREDLO
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#1e2a30] flex items-center justify-center text-gray-400 hover:text-[#49BFBE] transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 w-full overflow-y-auto pb-32 flex flex-col items-center justify-center relative [&::-webkit-scrollbar]:hidden">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl text-gray-200 font-medium mb-8 absolute top-10 left-6 md:left-32"
        >
          Your Cibil Score
        </motion.h1>
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#49BFBE]/10 rounded-full blur-[60px] pointer-events-none" />
          <CreditGauge
            score={scoreData.score}
            changeAmount={scoreData.changeAmount}
            changeDirection={scoreData.changeDirection}
          />
        </div>
        <div className="text-center space-y-2">
          <div className="text-xl font-bold flex items-center justify-center gap-2">
            <span>{scoreData.comment}</span>
            <span className="text-2xl">{scoreData.emoji}</span>
          </div>
          <div className="text-gray-500 text-sm">Generated {currentDate}</div>
        </div>
      </main>
      <footer className="fixed bottom-16 w-full text-center py-4 text-[10px] text-gray-700 pointer-events-none z-0">
        Credlo © All rights reserved
      </footer>
      <Dock items={dockItems} panelHeight={68} baseItemSize={50} />
    </div>
  );
};
export default CibilScore;
