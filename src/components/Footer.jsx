"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiTwitter, FiInstagram, FiMessageSquare } from "react-icons/fi";
import { FaDiscord, FaCcVisa, FaCcMastercard, FaCcPaypal, FaBitcoin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0d0d0d] border-t border-white/5 pt-16 md:pt-20 pb-10 z-20 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- MAIN FOOTER CONTENT --- */}
        {/* Responsive Grid: 1 col on Mobile, 2 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left"
          >
            <Link href="/" className="flex items-center gap-3 group w-max">
              <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="text-white font-heading font-bold text-xl leading-none">B</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-widest uppercase text-white">
                Boosting Nation
              </span>
            </Link>
            <p className="text-white/50 text-sm font-body leading-relaxed max-w-xs md:max-w-none">
              Premium gaming services delivered by the top 0.1% of players. Stop grinding and start experiencing the endgame.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left"
          >
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm">Navigation</h4>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <Link href="/" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Home</Link>
              <Link href="/#games-section" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Games</Link>
              <Link href="/#reviews" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Reviews</Link>
              {/* 👇 NEW BLOG LINK ADDED HERE 👇 */}
              <Link href="/blogs" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Blogs & Guides</Link>
            </div>
          </motion.div>

          {/* Column 3: Legal & Support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left"
          >
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm">Support</h4>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <Link href="/contact" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max flex items-center gap-2">
                <FiMessageSquare /> Contact Us
              </Link>
              {/* ✅ Updated Links Here */}
              <Link href="/terms" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Terms of Service</Link>
              <Link href="/privacy" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Privacy Policy</Link>
              <Link href="/refund" className="text-white/50 hover:text-blue-400 text-sm font-body transition-colors w-max">Refund Policy</Link>
            </div>
          </motion.div>

          {/* Column 4: Optional Newsletter or Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left"
          >
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm">Our Mission</h4>
            <p className="text-white/40 text-xs font-body leading-relaxed max-w-xs">
              We aim to provide the fastest and most secure boosting experience in the industry, maintaining total account anonymity.
            </p>
          </motion.div>

        </div>

        {/* --- BOTTOM FOOTER (Copyright & Payments) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left"
        >
          <p className="text-white/30 text-xs font-body tracking-wider">
            © {new Date().getFullYear()} Boosting Nation. All rights reserved.
          </p>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-6 md:gap-4 text-white/30">
            <FaCcVisa className="w-8 h-8 hover:text-[#f79e1b] transition-colors cursor-pointer" />
            <FaCcMastercard className="w-8 h-8 hover:text-[#eb001b] transition-colors cursor-pointer" />
            <FaCcPaypal className="w-8 h-8 hover:text-[#003087] transition-colors cursor-pointer" />
            <FaBitcoin className="w-8 h-8 hover:text-[#f7931a] transition-colors cursor-pointer" />
          </div>
        </motion.div>

      </div>
    </footer>
  );
}