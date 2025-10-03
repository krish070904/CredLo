import React from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
const Navbar = ({ userName = "User" }) => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 md:px-12 py-4 bg-transparent z-50">
      {}
      <div className="flex items-center gap-2">
        {}
        <img
          src="/mascot.png"
          alt="CredLo"
          className="w-8 h-8 object-contain"
        />
        <span className="text-[#49BFBE] font-bold text-xl font-amiko tracking-widest">
          CREDLO
        </span>
      </div>
      {}
      <div className="flex items-center gap-6 text-gray-300 text-sm font-medium">
        <Link to="/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
        <Link to="/help" className="hover:text-white transition-colors">
          Help
        </Link>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
          <span>English</span>
          <ChevronDown size={16} />
        </div>
        {}
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3f3f46]/50 hover:bg-[#3f3f46] transition-colors">
          <Bell size={16} className="text-gray-200" />
        </button>
        {}
        <button
          className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 hover:border-[#49BFBE] transition-colors"
          title="Profile"
        >
          {}
          <img
            src={`https://ui-avatars.com/api/?name=${userName}&background=random&color=fff`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
