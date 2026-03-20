"use client";

import { motion } from "framer-motion";
import { SiDiscord } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";

// --- HELPER COMPONENT: THE MISSING PIECE ---
const AnimatedWordText = ({ text, delayOffset = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
          <motion.span
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delayOffset + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function ContactPage() {
  return (
    /* pt-32 md:pt-40 creates the distance from your fixed Navbar */
    <main className="relative min-h-screen w-full bg-agency-black flex flex-col items-center pt-28 md:pt-40 pb-20 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="font-heading text-4xl md:text-7xl font-bold text-white uppercase tracking-tight flex flex-wrap justify-center gap-x-2 md:gap-x-4">
            <AnimatedWordText text="Join Our" delayOffset={0.2} />
            <AnimatedWordText text="Community" delayOffset={0.4} className="text-white" />
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/40 mt-6 text-sm md:text-lg max-w-xl mx-auto px-4"
          >
            Skip the emails. Connect directly with our elite boosters and 24/7 support team on Discord for instant service.
          </motion.p>
        </div>

        {/* --- DISCORD CARD --- */}
        <motion.a
          href="https://discord.gg/sNEU4zAs7T" 
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          /* Mobile: flex-col with more padding. Desktop: flex-row with aspect ratio. */
          className="group relative w-full max-w-2xl flex flex-col md:flex-row items-center justify-between p-8 md:px-16 md:aspect-[3/1] bg-[#5865F2]/5 border border-[#5865F2]/20 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden hover:border-[#5865F2]/50 transition-all duration-700 shadow-2xl gap-8 md:gap-0"
        >
          <div className="absolute inset-0 bg-[#5865F2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10 text-center md:text-left">
            <div className="relative">
              <div className="absolute inset-0 bg-[#5865F2] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <SiDiscord className="w-20 h-20 md:w-24 md:h-24 text-[#5865F2] relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-[#5865F2] font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-1">Official Server</span>
              <h2 className="text-white font-heading text-3xl md:text-4xl font-bold uppercase">Connect Now</h2>
            </div>
          </div>

          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 relative z-10">
            <FiArrowUpRight className="text-white group-hover:text-black w-7 h-7 md:w-8 md:h-8 transition-colors" />
          </div>
        </motion.a>

        {/* --- FOOTER BADGE --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 md:mt-16 flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Boosters Online & Ready</span>
        </motion.div>

      </div>
    </main>
  );
}