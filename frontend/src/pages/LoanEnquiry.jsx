import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";
const LoanEnquiry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loan, userCity } = location.state || {};
  const handleCallback = async () => {
    try {
      await api.post("/enquiries", {
        bankName: loan.bankName,
        loanType: "Personal Loan",
        amount: 50000,
        interestRate: loan.interestRate,
        contactMethod: "Callback",
      });
      toast.success(
        "Callback requested successfully! Our agent will contact you soon.",
      );
    } catch (error) {
      console.error("Callback Error:", error);
      toast.error("Failed to request callback. Please try again.");
    }
  };
  if (!loan) {
    return (
      <div className="h-screen w-full bg-[#060D0C] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No Loan Selected</h2>
        <button
          onClick={() => navigate("/loan-finder")}
          className="text-[#49BFBE] hover:underline"
        >
          Go Back to Finder
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-[#060D0C] text-white font-display overflow-x-hidden p-6 md:p-12">
      <Toaster position="top-center" />
      {}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-8">
        <div
          onClick={() => navigate(-1)}
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
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {}
        <div className="bg-[#1e2a30] rounded-3xl p-8 border border-gray-700 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <Building className="text-black" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{loan.bankName}</h1>
              <span className="text-[#49BFBE] text-sm">
                Recommended for you
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Interest Rate</p>
              <p className="text-3xl font-bold text-white">
                {loan.interestRate}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Estimated EMI</p>
              <p className="text-xl font-semibold text-white">{loan.emi}</p>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-white font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {(Array.isArray(loan.features)
                  ? loan.features
                  : [loan.features]
                ).map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#49BFBE] mt-0.5 shrink-0"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {}
        <div className="space-y-6">
          {}
          <div className="bg-[#1e2a30] rounded-3xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="text-[#49BFBE]" size={20} />
              Nearest Branch
            </h3>
            <div className="bg-black/30 p-4 rounded-xl mb-4 border border-gray-700/50">
              <p className="font-medium text-white">
                {loan.bankName} - {userCity} Main Branch
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Sector 18, Commercial Belt, {userCity}
              </p>
              <p className="text-xs text-[#49BFBE] mt-2">~2.5 km away</p>
            </div>
            <div className="w-full h-32 bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer border border-gray-700">
              {}
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/77.2090,28.6139,12,0/400x200?access_token=pk.mock')] opacity-50 bg-cover bg-center"></div>
              <span className="relative z-10 bg-black/70 px-4 py-2 rounded-full text-xs font-bold text-white group-hover:text-[#49BFBE] transition-colors border border-gray-600">
                View on Maps
              </span>
            </div>
          </div>
          {}
          <div className="bg-[#1e2a30] rounded-3xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-[#49BFBE]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Customer Care</p>
                  <p className="text-white font-medium line-through decoration-red-500/50">
                    1800-202-6161
                  </p>
                  <p className="text-[#49BFBE] font-medium">1800-CRED-LOAN</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-[#49BFBE]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Support</p>
                  <p className="text-white font-medium">
                    loansupport@{loan.bankName.toLowerCase().replace(/\s/g, "")}
                    .com
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCallback}
              className="w-full mt-6 bg-[#49BFBE] text-black font-bold py-3 rounded-xl hover:bg-[#3aa9a8] transition-colors shadow-lg"
            >
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoanEnquiry;
