import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ChevronLeft, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const AiChat = () => {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm CredLo Assistant, what would you like me to help me with?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const history = newMessages
        .slice(0, -1)
        .filter((_, index) => index > 0 || newMessages[0].role === "user")
        .map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text }],
        }));
      const { data } = await api.post("/chat", {
        message: text,
        history,
      });
      setMessages([...newMessages, { role: "model", text: data.reply }]);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      const errorMessage =
        error.response?.data?.message ||
        "I'm having trouble connecting right now. Please try again later.";
      setMessages([...newMessages, { role: "model", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };
  const suggestions = [
    { icon: "💰", text: "Help me find the best loan for me" },
    { icon: "📊", text: "CIBIL Score assistance" },
    { icon: "⚖️", text: "Compare loans" },
  ];
  return (
    <div className="h-screen w-full bg-[#060D0C] text-white font-display overflow-hidden flex flex-col relative selection:bg-[#49BFBE] selection:text-black">
      {}
      <div className="w-full h-16 flex items-center justify-between px-6 md:px-12 py-4 shrink-0 z-10">
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
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <button className="hover:text-white transition-colors">Help</button>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&color=fff`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {}
      <div className="flex-1 overflow-y-auto px-4 md:px-32 py-8 max-w-5xl mx-auto w-full flex flex-col items-center [&::-webkit-scrollbar]:hidden">
        {}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center mt-12 mb-12 text-center"
          >
            <div className="w-48 h-48 mb-6 relative">
              {}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#49BFBE]/20 rounded-full blur-3xl" />
              <img
                src="/mascot.png"
                alt="AI Mascot"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-2">
              Welcome!, to <span className="text-[#49BFBE]">Credlo AI</span>
            </h1>
          </motion.div>
        )}
        {}
        <div
          className={`w-full max-w-3xl space-y-6 ${messages.length === 1 ? "flex-1" : ""}`}
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "model" && (
                  <div className="w-10 h-10 rounded-full bg-[#1e2a30] flex items-center justify-center shrink-0 border border-gray-700">
                    <img src="/mascot.png" className="w-6 h-6 object-contain" />
                  </div>
                )}
                <div
                  className={`
                                    py-3 px-5 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed overflow-hidden
                                    ${
                                      msg.role === "user"
                                        ? "bg-[#49BFBE] text-[#060D0C] font-semibold rounded-tr-sm"
                                        : "bg-[#1e2a30] text-gray-200 border border-gray-700/50 rounded-tl-sm shadow-xl p-4"
                                    }
                                `}
                >
                  {msg.role === "user" ? (
                    msg.text
                  ) : (
                    <div
                      className="prose prose-invert prose-sm max-w-none 
                                                prose-headings:text-[#49BFBE] prose-headings:font-bold prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0
                                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0
                                                prose-strong:text-white prose-strong:font-bold
                                                prose-ul:list-disc prose-ul:pl-4 prose-ul:space-y-1 prose-ul:mb-3
                                                prose-ol:list-decimal prose-ol:pl-4 prose-ol:space-y-1 prose-ol:mb-3
                                                prose-li:text-gray-300
                                                prose-blockquote:border-l-4 prose-blockquote:border-[#49BFBE] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-800/50 prose-blockquote:py-1
                                                prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[#49BFBE] prose-code:font-mono prose-code:text-xs
                                                prose-pre:bg-black/50 prose-pre:p-3 prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-700
                                                prose-a:text-[#49BFBE] prose-a:underline hover:prose-a:text-[#3aa9a8]"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#1e2a30] flex items-center justify-center shrink-0 border border-gray-700">
                  <img
                    src="/mascot.png"
                    className="w-6 h-6 object-contain animate-pulse"
                  />
                </div>
                <div className="flex gap-1 items-center bg-[#1e2a30] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-700/50">
                  <span className="w-2 h-2 bg-[#49BFBE] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-[#49BFBE] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-[#49BFBE] rounded-full animate-bounce"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
        {}
        {messages.length < 3 && !loading && (
          <div className="w-full max-w-xl flex flex-col gap-3 mt-auto mb-8">
            {suggestions.map((suggestion, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSend(suggestion.text)}
                className="flex items-center gap-4 bg-[#1e2a30]/50 hover:bg-[#1e2a30] p-4 rounded-xl border border-gray-700/50 hover:border-[#49BFBE]/50 transition-all group text-left w-full"
              >
                <span className="text-xl">{suggestion.icon}</span>
                <span className="text-gray-300 group-hover:text-white font-medium">
                  {suggestion.text}
                </span>
                <ChevronLeft className="ml-auto w-5 h-5 text-gray-600 group-hover:text-[#49BFBE] rotate-180 transition-colors" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
      {}
      <div className="w-full p-4 md:p-6 bg-gradient-to-t from-[#060D0C] via-[#060D0C] to-transparent z-20">
        <div className="max-w-3xl mx-auto relative flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 shrink-0 hidden md:block">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&color=fff`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type what you want..."
              className="w-full bg-[#1e2a30] text-white placeholder-gray-500 rounded-full py-4 pl-6 pr-14 outline-none border border-gray-700 focus:border-[#49BFBE]/50 focus:ring-1 focus:ring-[#49BFBE]/20 transition-all shadow-lg"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#49BFBE] disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-600">
          CredLo AI can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
};
export default AiChat;
