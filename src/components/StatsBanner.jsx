"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { FiAward, FiThumbsUp } from "react-icons/fi";
import { FaDiscord, FaHandshake, FaHandsHelping } from "react-icons/fa";

// --- DATA ---
const stats = [
  { id: 1, icon: FiAward, endValue: 5, label: "Years of Success" },
  { id: 2, icon: FaHandsHelping, endValue: 50000, label: "Satisfied Gamers" },
  { id: 3, icon: FaHandshake, endValue: 100000, label: "Completed Orders" },
  { id: 4, icon: FiThumbsUp, endValue: 10000, label: "Vouchers Under Our Name" },
  { id: 5, icon: FaDiscord, endValue: 3500, label: "Discord Members" },
];

// --- HELPER COMPONENT: THE ANIMATED COUNTER ---
const CounterItem = ({ icon: Icon, endValue, label }) => {
  const count = useMotionValue(0);
  const roundedToStr = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, endValue, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, endValue]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 lg:p-4">
      {/* Icon */}
      <Icon className="w-8 h-8 text-white/60 group-hover:text-blue-400 transition-colors duration-500 mb-4" />
      
      {/* Number */}
      <div className="font-heading text-3xl md:text-3xl lg:text-4xl font-bold text-blue-500 mb-2 flex items-center justify-center drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
        <motion.span>{roundedToStr}</motion.span>
        <span>+</span>
      </div>
      
      {/* Label */}
      <p className="text-white/60 text-[10px] md:text-xs font-body uppercase tracking-widest max-w-[150px]">
        {label}
      </p>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function StatsBanner() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-agency-black z-20 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-[50%] bg-blue-500/10 blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* GLASSMORPHISM CONTAINER */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[2.5rem] md:rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 border-t-blue-500/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-2 md:p-8 md:py-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Grid layout - Optimized for Mobile Flow */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat) => (
              <CounterItem key={stat.id} icon={stat.icon} endValue={stat.endValue} label={stat.label} />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}