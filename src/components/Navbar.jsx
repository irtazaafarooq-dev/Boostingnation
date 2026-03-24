"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ Added router hooks
import Image from "next/image"; 
import { FiShoppingCart, FiMenu, FiX, FiUser, FiChevronRight } from "react-icons/fi";
import { dark } from '@clerk/themes';

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

const AnimatedText = ({ text, delayOffset = 0.9, className = "" }) => {
  const characters = text.split("");
  return (
    <span className={`flex ${className}`}>
      {characters.map((char, index) => (
        <span key={index} className="overflow-hidden inline-block pb-1">
          <motion.span
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: delayOffset + index * 0.04, 
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId } = useAuth();
  const { scrollY } = useScroll();
  
  // ✅ Initialize Next.js navigation hooks
  const pathname = usePathname();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Games", href: "/#games-section" },
    { name: "Contact", href: "/contact" },
    { name: "Reviews", href: "/#reviews" },
  ];

  // ✅ NEW: Custom click handler for smooth scrolling
  const handleNavClick = (e, href, isMobile = false) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");

      if (pathname === "/") {
        // If on homepage, smooth scroll
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else {
        // If on another page, route back to homepage
        router.push(href);
      }
    }

    // Always close mobile menu if clicked from there
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-[60] transition-all duration-500 left-0 right-0 mx-auto ${
          isScrolled 
            ? "top-4 w-[95%] max-w-7xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]" 
            : "top-0 w-full bg-transparent py-6 border-transparent rounded-none"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          
          {/* --- LEFT: LOGO --- */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="block">
                <AnimatedText 
                  text="Boosting Nation" 
                  delayOffset={0.9} 
                  className="font-heading font-bold text-base md:text-xl tracking-widest uppercase text-white group-hover:text-white/80 transition-colors" 
                />
              </div>
            </Link>
          </div>

          {/* --- CENTER: LINKS --- */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link, index) => {
              // ✅ Check if it's a hash link to apply the <a> tag fix
              const isHashLink = link.href.startsWith("/#");
              
              return isHashLink ? (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative text-sm font-body font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest py-2 cursor-pointer"
                >
                  <AnimatedText text={link.name} delayOffset={1.1 + (index * 0.1)} />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="group relative text-sm font-body font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest py-2"
                >
                  <AnimatedText text={link.name} delayOffset={1.1 + (index * 0.1)} />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              );
            })}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="relative text-white/80 hover:text-white hover:scale-110 transition-all duration-300 group"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full group-hover:animate-pulse">
                  0
                </span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                {!userId ? (
                  <SignInButton mode="modal" >
                    <button className="group relative overflow-hidden flex items-center gap-2 text-sm font-body font-bold text-white uppercase tracking-widest border border-white/20 px-4 py-2 hover:border-blue-500 transition-colors duration-300 rounded-sm">
                      <div className="absolute inset-0 bg-white/20 skew-x-[-45deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                      <FiUser className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">
                        <AnimatedText text="Log In" delayOffset={1.5} />
                      </span>
                    </button>
                  </SignInButton>
                ) : (
                  <UserButton />
                )}
              </motion.div>
            </div>

            <button 
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[70] bg-[#0b0f14]/80 flex flex-col px-6 py-8 overflow-hidden"
          >
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex justify-between items-center mb-16 relative z-10">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-white/50">Navigation</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors border border-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 relative z-10 flex-1">
              {navLinks.map((link, i) => {
                const isHashLink = link.href.startsWith("/#");

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isHashLink ? (
                      <a 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href, true)}
                        className="group flex items-center justify-between w-full cursor-pointer"
                      >
                        <span className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                          {link.name}
                        </span>
                        <FiChevronRight className="w-8 h-8 text-white/0 group-hover:text-blue-500 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center justify-between w-full"
                      >
                        <span className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                          {link.name}
                        </span>
                        <FiChevronRight className="w-8 h-8 text-white/0 group-hover:text-blue-500 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-auto pb-6"
            >
              {!userId ? (
                <SignInButton mode="modal">
                  <button className="w-full relative overflow-hidden flex items-center justify-center gap-3 text-sm font-body font-bold text-white uppercase tracking-widest border border-white/20 py-5 bg-white/5 backdrop-blur-md rounded-2xl hover:border-blue-500 transition-all duration-300 group shadow-lg">
                    <div className="absolute inset-0 bg-blue-500/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
                    <FiUser className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Log In / Register</span>
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center justify-between px-6 text-sm font-body font-bold text-white uppercase tracking-widest bg-white/5 backdrop-blur-md border border-white/10 py-5 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <UserButton />
                    <span>My Account</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}