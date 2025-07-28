import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Home,
  User,
  LogOut,
  Sparkles,
  PieChart,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, Tooltip } from "recharts";
import api from "../services/api";
import Dock from "../components/Dock";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name.split(" ")[0] : "User";
  const [cards, setCards] = useState([]);
  const expenseData = [
    { name: "EMI", value: 12500, color: "#49BFBE" },
    { name: "Food", value: 8000, color: "#eab308" },
    { name: "Travel", value: 4500, color: "#3b82f6" },
    { name: "Others", value: 6000, color: "#ef4444" },
  ];
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const fetchCards = async () => {
      try {
        const { data } = await api.get("/cards/trending");
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch cards", error);
      }
    };
    fetchCards();
  }, [user, navigate]);
  const handleLogout = async () => {
    await authService.logout();
    navigate("/");
  };
  const dockItems = [
    {
      icon: <Home size={24} />,
      label: "Home",
      onClick: () => console.log("Home"),
    },
    {
      icon: <User size={24} />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <Sparkles size={24} />,
      label: "AI Chat",
      onClick: () => navigate("/ai-chat"),
    },
    { icon: <LogOut size={24} />, label: "Logout", onClick: handleLogout },
  ];
  return (
    <div className="h-screen w-full bg-[#060D0C] text-white font-display overflow-hidden selection:bg-[#49BFBE] selection:text-black flex flex-col">
      {}
      <div className="w-full h-16 flex items-center justify-between px-6 md:px-12 py-4 shrink-0">
        <div className="flex items-center gap-2">
          <img
            src="/mascot.png"
            alt="CredLo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-[#49BFBE] font-bold text-xl font-amiko tracking-widest">
            CREDLO
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 cursor-pointer"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${userName}&background=random&color=fff`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <main className="flex-1 w-full overflow-y-auto px-6 md:px-32 py-8 max-w-7xl mx-auto space-y-8 pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {}
          <div
            onClick={() => navigate("/cibil-score")}
            className="bg-[#1e2a30] rounded-2xl p-6 border border-gray-700/50 hover:border-[#49BFBE]/30 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#49BFBE]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-400 font-medium">CIBIL Score</h3>
                <div className="text-4xl font-bold text-white mt-1 group-hover:text-[#49BFBE] transition-colors">
                  {user?.cibilScore || 750}
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded-lg text-[#49BFBE]">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="text-sm text-green-400 flex items-center gap-1">
              <span>+12 pts</span>
              <span className="text-gray-500">last month</span>
            </div>
          </div>
          {}
          <div className="bg-[#1e2a30] rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-400 font-medium">Upcoming EMI</h3>
                <div className="text-3xl font-bold text-white mt-1">
                  ₹12,499
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded-lg text-red-400 animate-pulse">
                <AlertCircle size={24} />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Personal Loan (HDFC)</span>
              <span className="text-red-400 font-medium">Due in 5 days</span>
            </div>
          </div>
          {}
          <div className="bg-[#1e2a30] rounded-2xl p-4 border border-gray-700/50 md:col-span-1 lg:col-span-1 flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Feb Spending</h3>
              <p className="text-2xl font-bold text-white">₹31,000</p>
              <div className="mt-4 space-y-1">
                {expenseData.map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>
                      {entry.name}: {(entry.value / 310).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <RechartsPie
                width={128}
                height={128}
                data={expenseData}
                dataKey="value"
                innerRadius={25}
                outerRadius={40}
                paddingAngle={5}
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </RechartsPie>
            </div>
          </div>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <div
            onClick={() => navigate("/ai-chat")}
            className="bg-[#1e2a30] p-6 rounded-2xl border border-gray-700/50 hover:border-[#49BFBE] transition-all cursor-pointer group flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-[#49BFBE]" size={20} />
                <h3 className="text-lg font-bold text-white">
                  AI Financial Advisor
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                Get instant answers about loans & credit.
              </p>
            </div>
            <div className="bg-[#49BFBE] p-3 rounded-full text-black group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </div>
          {}
          <div
            onClick={() => navigate("/loan-finder")}
            className="bg-[#1e2a30] p-6 rounded-2xl border border-gray-700/50 hover:border-[#49BFBE] transition-all cursor-pointer group flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="text-[#49BFBE]" size={20} />
                <h3 className="text-lg font-bold text-white">Loan Finder</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Compare rates from 20+ banks instantly.
              </p>
            </div>
            <div className="bg-[#49BFBE] p-3 rounded-full text-black group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
        {}
        <div className="pt-2">
          <h3 className="text-lg font-medium text-gray-200 underline decoration-gray-500 underline-offset-4 mb-6">
            Trending Credit Cards
          </h3>
          <div className="flex flex-wrap gap-6">
            {cards.map((card) => (
              <div
                key={card._id}
                onClick={() => navigate("/loan-finder")}
                className="flex flex-col gap-2 group cursor-pointer"
              >
                <div className="w-32 h-32 bg-white rounded-3xl p-4 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={card.logoUrl}
                    alt={card.name}
                    className="w-full h-full object-contain z-10"
                  />
                </div>
                <div className="px-1">
                  <div className="text-[#49BFBE] font-bold text-lg leading-tight group-hover:underline">
                    {card.name}
                  </div>
                  <div className="text-gray-500 text-xs">{card.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
};
export default Dashboard;
