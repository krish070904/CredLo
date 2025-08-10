import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
const LoanFinder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    loanType: "Personal Loan",
    loanAmount: "50000",
    loanTenure: "36 Months",
    monthlyIncome: "50000",
    employmentType: "Corporate Job",
    cibilScore: user?.cibilScore || 750,
    preferredBanks: [],
  });
  const banks = ["HDFC", "Axis", "SBI", "ICICI"];
  const handleBankToggle = (bank) => {
    setFormData((prev) => ({
      ...prev,
      preferredBanks: prev.preferredBanks.includes(bank)
        ? prev.preferredBanks.filter((b) => b !== bank)
        : [...prev.preferredBanks, bank],
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post("/loans/recommend", formData);
      if (data.recommendations) {
        setResult(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#060D0C] text-white font-display overflow-x-hidden p-6 md:p-12 flex flex-col items-center">
      {}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/mascot.png"
            alt="CredLo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-[#49BFBE] font-bold text-xl font-amiko tracking-widest hidden md:block">
            CREDLO
          </span>
        </div>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full"
        >
          <h1 className="text-3xl font-medium text-gray-200 underline decoration-gray-600 underline-offset-8 mb-8">
            Loan Finder
          </h1>
          <div className="space-y-6">
            {}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">
                Loan Type
              </label>
              <select
                value={formData.loanType}
                onChange={(e) =>
                  setFormData({ ...formData, loanType: e.target.value })
                }
                className="w-full bg-[#1e2a30] text-gray-200 p-4 rounded-xl border border-gray-700 focus:border-[#49BFBE] outline-none appearance-none cursor-pointer"
              >
                <option>Personal Loan</option>
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Education Loan</option>
              </select>
            </div>
            {}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, loanAmount: e.target.value })
                  }
                  className="w-full bg-[#1e2a30] text-gray-200 p-4 pl-8 rounded-xl border border-gray-700 focus:border-[#49BFBE] outline-none"
                />
              </div>
            </div>
            {}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">
                Loan Tenure
              </label>
              <select
                value={formData.loanTenure}
                onChange={(e) =>
                  setFormData({ ...formData, loanTenure: e.target.value })
                }
                className="w-full bg-[#1e2a30] text-gray-200 p-4 rounded-xl border border-gray-700 focus:border-[#49BFBE] outline-none appearance-none cursor-pointer"
              >
                <option>12 Months</option>
                <option>24 Months</option>
                <option>36 Months</option>
                <option>48 Months</option>
                <option>60 Months</option>
              </select>
            </div>
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        monthlyIncome: e.target.value,
                      })
                    }
                    className="w-full bg-[#1e2a30] text-gray-200 p-4 pl-8 rounded-xl border border-gray-700 focus:border-[#49BFBE] outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({ ...formData, employmentType: e.target.value })
                  }
                  className="w-full bg-[#1e2a30] text-gray-200 p-4 rounded-xl border border-gray-700 focus:border-[#49BFBE] outline-none appearance-none cursor-pointer"
                >
                  <option>Corporate Job</option>
                  <option>Self Employed</option>
                  <option>Government Job</option>
                  <option>Studnet</option>
                </select>
              </div>
            </div>
            {}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-sm font-medium">
                  Approximate CIBIL Score
                </label>
                <span className="text-[#49BFBE] font-bold border border-[#49BFBE] px-2 py-1 rounded-md">
                  {formData.cibilScore}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="900"
                value={formData.cibilScore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cibilScore: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#49BFBE]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>300</span>
                <span>900</span>
              </div>
            </div>
            {}
            <div className="space-y-3 pt-2">
              <label className="text-gray-400 text-sm font-medium block">
                Do you have a co-applicant? (Preferred Banks)
              </label>
              <div className="flex flex-col gap-2">
                {banks.map((bank) => (
                  <div
                    key={bank}
                    onClick={() => handleBankToggle(bank)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.preferredBanks.includes(bank) ? "bg-[#49BFBE] border-[#49BFBE]" : "border-gray-600 group-hover:border-[#49BFBE]"}`}
                    >
                      {formData.preferredBanks.includes(bank) && (
                        <Check size={14} className="text-black" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${formData.preferredBanks.includes(bank) ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}
                    >
                      {bank}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#49BFBE] text-black font-bold text-lg py-4 rounded-full mt-6 hover:bg-[#3aa9a8] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Finding Best Loans...
                </>
              ) : (
                "Find Loans"
              )}
            </button>
          </div>
        </motion.div>
        {}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full"
        >
          {!result && !loading && (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl p-8">
              <Sparkles className="w-16 h-16 mb-4 text-gray-700" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                AI Loan Recommendations
              </h3>
              <p className="max-w-xs">
                Fill out the details on the left and let our AI find the perfect
                loan options for you.
              </p>
            </div>
          )}
          {loading && (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 border-4 border-[#49BFBE] border-t-transparent rounded-full animate-spin mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Analyzing your profile...
              </h3>
              <p className="text-gray-400">
                Comparing interest rates across 20+ banks
              </p>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-[#49BFBE]" fill="#49BFBE" />
                Top Recommendations
              </h2>
              {result.length === 0 ? (
                <div className="text-center p-8 bg-[#1e2a30] rounded-2xl">
                  <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-300">
                    No specific recommendations found. Try adjusting your amount
                    or tenure.
                  </p>
                </div>
              ) : (
                result.map((loan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#1e2a30] rounded-2xl p-6 border border-gray-700 hover:border-[#49BFBE] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#49BFBE] transition-colors">
                          {loan.bankName}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${loan.approvalChance === "High" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {loan.approvalChance} Approval Chance
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#49BFBE]">
                          {loan.interestRate}
                        </div>
                        <div className="text-xs text-gray-500">
                          Interest Rate
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-4 border-t border-gray-700/50 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Monthly EMI</div>
                        <div className="font-semibold text-white">
                          {loan.emi}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const breakdownId = `breakdown-${idx}`;
                          const el = document.getElementById(breakdownId);
                          if (el) el.classList.toggle("hidden");
                        }}
                        className="text-sm text-[#49BFBE] hover:underline"
                      >
                        View Breakdown
                      </button>
                    </div>
                    {}
                    <div
                      id={`breakdown-${idx}`}
                      className="hidden mb-4 bg-black/20 p-3 rounded-lg text-xs space-y-1"
                    >
                      <div className="flex justify-between text-gray-400">
                        <span>Principal Component</span>
                        <span>~65%</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Interest Component</span>
                        <span>~35%</span>
                      </div>
                      <div className="flex justify-between text-[#49BFBE] font-medium pt-1 border-t border-white/5">
                        <span>Total Payable</span>
                        <span>(EMI x Tenure)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {loan.features && Array.isArray(loan.features) ? (
                        loan.features.map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <Check
                              size={14}
                              className="mt-0.5 text-[#49BFBE]"
                            />
                            <span>{feat}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">{loan.features}</p>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        navigate("/loan-enquiry", {
                          state: { loan, userCity: user?.city || "Your City" },
                        })
                      }
                      className="w-full mt-6 bg-white text-black font-bold py-3 rounded-xl hover:bg-[#49BFBE] transition-colors"
                    >
                      Enquiry Details
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default LoanFinder;
