import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, ArrowLeft, Sparkles, Upload } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {
        name: "Anjali Gupta",
        email: "Agupte@gmail.com",
        mobile: "+91-9876543210",
        address: "Gangapur road - Nashik",
        city: "Nashik",
        cibilScore: 780
    };

    const data = [
        { name: 'Jan', score: 650, loan: 400, limit: 200 },
        { name: 'Feb', score: 680, loan: 450, limit: 300 },
        { name: 'Mar', score: 660, loan: 420, limit: 250 },
        { name: 'Apr', score: 710, loan: 500, limit: 350 },
        { name: 'May', score: 700, loan: 480, limit: 320 },
        { name: 'Jun', score: 750, loan: 550, limit: 400 },
        { name: 'Jul', score: 740, loan: 530, limit: 380 },
        { name: 'Aug', score: 760, loan: 580, limit: 420 },
        { name: 'Sep', score: 780, loan: 600, limit: 450 },
        { name: 'Oct', score: user.cibilScore || 780, loan: 620, limit: 480 },
    ];

    return (
        <div className="min-h-screen w-full bg-[#060D0C] text-white font-display overflow-x-hidden p-6 md:p-12 flex flex-col">
            <Toaster />
            {/* Header */}
            <div className="w-full flex items-center justify-between mb-8">
                <div onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer">
                    <img src="/mascot.png" alt="CredLo" className="w-8 h-8 object-contain" />
                    <span className="text-[#49BFBE] font-bold text-xl font-amiko tracking-widest hidden md:block">CREDLO</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
                    <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Dashboard</button>
                    <div className="w-10 h-10 rounded-full bg-[#1e2a30] flex items-center justify-center text-gray-400 hover:text-[#49BFBE] transition-colors cursor-pointer">
                        <Bell size={20} />
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
                {/* Title */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-medium text-gray-200 underline decoration-gray-600 underline-offset-8">Profile</h1>
                    <Settings className="text-white w-8 h-8 cursor-pointer hover:rotate-90 transition-transform" />
                </div>

                {/* User Info Card */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1e2a30] shadow-2xl mb-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=256`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-3xl font-medium text-gray-200 mb-2">{user.name}</h2>
                    <div className="text-center space-y-1">
                        <p className="text-gray-400 text-sm underline decoration-gray-600">{user.email}</p>
                        <p className="text-gray-400 text-sm">{user.mobile}</p>
                        <p className="text-gray-400 text-sm">{user.address}</p>
                    </div>
                </div>

                {/* Document Verification Section */}
                <div className="bg-[#1e2a30] rounded-xl p-8 border border-gray-700 shadow-xl mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Verify Income with AI</h3>
                            <p className="text-gray-400 text-sm max-w-md">Upload your latest Bank Statement or Payslip (Image/PDF). Our AI will analyze it to instantly verify your income and boost your loan approval chances.</p>
                        </div>
                        <div className="bg-[#49BFBE]/10 p-3 rounded-full">
                            <Sparkles className="text-[#49BFBE]" size={24} />
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-[#49BFBE] transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const formData = new FormData();
                                formData.append('document', file);

                                try {
                                    const loadingToast = toast.loading("Analyzing document with AI...");
                                    const { data } = await api.post('/documents/analyze', formData, {
                                        headers: { 'Content-Type': 'multipart/form-data' }
                                    });

                                    toast.dismiss(loadingToast);
                                    toast.success(`Verified! Income: ₹${data.monthlyIncome}`);
                                } catch (err) {
                                    toast.dismiss();
                                    toast.error("Analysis failed. Try a clearer image.");
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-3">
                            <Upload className="text-gray-400" size={32} />
                            <span className="text-[#49BFBE] font-medium">Click to Upload Statement</span>
                            <span className="text-xs text-gray-500">Supports JPG, PNG (Max 5MB)</span>
                        </div>
                    </div>
                </div>

                {/* Graphs Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* CIBIL Graph */}
                    <div className="bg-[#101415] rounded-xl p-6 border border-gray-800 shadow-xl relative">
                        <h3 className="text-gray-400 text-sm mb-4">Cibil Graph</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#49BFBE" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#49BFBE" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorLoan" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorLimit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} domain={[0, 900]} ticks={[0, 100, 300, 700, 900]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e2a30', border: 'none', borderRadius: '8px' }}
                                        labelStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#49BFBE" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                                    <Area type="monotone" dataKey="loan" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorLoan)" />
                                    <Area type="monotone" dataKey="limit" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLimit)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Loan Availability */}
                    <div className="bg-[#101415] rounded-xl p-6 border border-gray-800 shadow-xl flex flex-col items-center justify-center">
                        <div className="w-full text-left mb-4">
                            <h3 className="text-gray-400 text-sm">Loan Applicable</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-3 h-3 bg-[#be185d] rounded-sm"></div>
                                <span className="text-xs text-gray-400">loan you can apply</span>
                            </div>
                        </div>
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="none"
                                    stroke="#1e2a30"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="none"
                                    stroke="#be185d"
                                    strokeWidth="8"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 * (1 - 0.70)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-gray-400">70%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="w-full text-center py-4 text-[10px] text-gray-600">
                Credlo © All rights reserved
            </footer>
        </div>
    );
};

export default Profile;