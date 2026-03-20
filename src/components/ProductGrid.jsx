"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function ProductGrid() {
  const [games, setGames] = useState([]);

  // Fetch games from Payload CMS
  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        const data = await res.json();
        if (data.docs) {
          setGames(data.docs);
        }
      } catch (error) {
        console.error("Failed to fetch games", error);
      }
    }
    fetchGames();
  }, []);

  return (
    <section id="games-section" className="relative w-full py-24 md:py-32 bg-agency-black z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              // Premium Boosting Services
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Most Boosted Games
            </h2>
          </motion.div>
        </div>

        {/* --- DYNAMIC GRID --- */}
        {/* Keeps your exact grid logic for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {games.length === 0 && (
            <p className="text-white/50 col-span-full text-center py-10">Loading games...</p>
          )}
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href={`/games/${game.slug}`} 
                className="group block relative w-full aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-[#121212] border border-white/5 hover:border-blue-500/50 transition-colors duration-500 shadow-xl"
              >
               <Image 
                  src={typeof game.image === 'object' && game.image?.url ? game.image.url : '/bo7.png'} 
                  alt={typeof game.image === 'object' && game.image?.alt ? game.image.alt : game.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex items-end justify-between">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white uppercase tracking-wide leading-tight max-w-[70%] drop-shadow-md">
                    {game.title}
                  </h3>
                  
                  {/* Icon logic preserved: Shows on mobile, animates on desktop hover */}
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center transform md:translate-x-4 opacity-100 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <FiArrowRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}