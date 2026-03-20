"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// --- HELPER COMPONENT: FLOATING CHARACTERS ---
const FloatingCharacter = ({ src, alt, className, delay = 0, duration = 6, opacityClass = "opacity-20 md:opacity-40" }) => {
  return (
    <motion.div
      className={`absolute pointer-events-none drop-shadow-[0_0_30px_rgba(56,189,248,0.2)] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -20, 0], rotate: [-1, 1, -1] }}
      transition={{ 
        opacity: { duration: 1.2, delay: 1.8 + (delay * 0.2), ease: "easeInOut" },
        y: { repeat: Infinity, duration, delay, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration, delay, ease: "easeInOut" }
      }}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className={`object-contain ${opacityClass}`} 
        priority
      />
    </motion.div>
  );
};

// --- HELPER COMPONENT: SPLIT TEXT ANIMATION ---
const AnimatedWord = ({ text, delayOffset = 0, className }) => {
  const words = text.split(" ");
  return (
    <h1 className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-2">
          <motion.span
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayOffset + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

// --- MAIN HERO COMPONENT ---
export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-transparent">
      
      {/* --- BACKGROUND FLOATING CHARACTERS --- */}
      
      {/* DESKTOP ONLY: Left Character */}
      <FloatingCharacter 
        src="/character1.png" 
        alt="Left Gaming Character"
        className="hidden md:block w-[400px] h-[600px] md:-left-10 lg:left-0 bottom-0 z-0"
        delay={0}
        duration={7}
      />
      
      {/* DESKTOP ONLY: Right Character */}
      <FloatingCharacter 
        src="/character2.png" 
        alt="Right Gaming Character"
        className="hidden md:block w-[400px] h-[600px] md:-right-10 lg:right-0 bottom-0 z-0"
        delay={2} 
        duration={8.5}
      />

      {/* MOBILE ONLY: Centered Character (Using character1) */}
      <FloatingCharacter 
        src="/character1.png" 
        alt="Mobile Hero Character"
        // Changed "bottom-5" to "top-24" so it floats safely below the navbar
        className="block md:hidden w-[380px] h-[550px] top-24 z-0 left-1/2 -translate-x-1/2"
        delay={1} 
        duration={8}
        opacityClass="opacity-25" 
      />

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl pt-16 md:pt-24 w-full">
        
        {/* ArmadaBoost Style Heading */}
        <AnimatedWord 
          text="Boost your games and dominate the leaderboards today!" 
          delayOffset={0.3} 
          className="font-heading text-[2.2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl"
        />

        {/* Clean Inter paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm md:text-base text-white/60 max-w-xl mb-10 leading-relaxed font-body px-2"
        >
          Exclusive gaming services delivered by the top 0.1% of players. 
          Stop grinding and start experiencing the endgame.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <Link 
            href="#games-section"
            className="group w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white px-8 py-4 font-bold tracking-widest text-xs uppercase hover:bg-blue-600 transition-colors duration-300 rounded-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
          >
            Choose your game
            <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}