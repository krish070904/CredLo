import React from "react";
import { motion } from "framer-motion";
const Loading = () => {
  return (
    <div className="h-screen w-full bg-[#060D0C] flex flex-col items-center justify-center relative overflow-hidden">
      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#49BFBE]/20 rounded-full blur-[100px] animate-pulse" />
      {}
      <motion.div
        className="w-16 h-16 border-4 border-[#1e2a30] border-t-[#49BFBE] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 text-[#49BFBE] font-amiko tracking-widest text-sm"
      >
        SECURING DATA...
      </motion.p>
    </div>
  );
};
export default Loading;
