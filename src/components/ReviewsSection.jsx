"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar, FiCheckCircle } from "react-icons/fi";

// --- MOCK DATA: 20 High-Quality Gaming Testimonials ---
const mockReviews = [
  { id: 1, user: "Alex K.", rank: "Global Elite", comment: "Absolutely seamless experience. The booster was professional and finished the order 2 days earlier than expected.", rating: 5 },
  { id: 2, user: "Marcus V.", rank: "Radiant", comment: "Best pricing I've found so far. The private stream feature kept me at ease while they worked on my account.", rating: 5 },
  { id: 3, user: "Sarah J.", rank: "Master Tier", comment: "VPN protection worked perfectly. My account stayed safe and the support team answered my questions instantly.", rating: 5 },
  { id: 4, user: "Liam N.", rank: "Challenger", comment: "I've tried other services, but Boosting Nation is on another level. The quality of players is unmatched.", rating: 5 },
  { id: 5, user: "David R.", rank: "Predator", comment: "Got my Apex Predator badge in just a few days. The booster even gave me some tips on my positioning.", rating: 5 },
  { id: 6, user: "Emma W.", rank: "Diamond 1", comment: "Was stuck in elo hell for months. They got me to Diamond smoothly. Worth every penny.", rating: 5 },
  { id: 7, user: "James T.", rank: "Top 500", comment: "Overwatch boosting was incredibly fast. Duo queue option was super fun, learned a lot playing with them.", rating: 5 },
  { id: 8, user: "Sophia L.", rank: "Immortal", comment: "Really fast starting time. Placed my order and they were on my account within 15 minutes.", rating: 5 },
  { id: 9, user: "Daniel B.", rank: "Iridescent", comment: "CoD Ranked is brutal this season, but the booster made it look easy. Highly recommend these guys.", rating: 5 },
  { id: 10, user: "Olivia C.", rank: "Grandmaster", comment: "Customer support is 10/10. I made a mistake on my order and they fixed it immediately without extra charge.", rating: 5 },
  { id: 11, user: "Noah P.", rank: "Faceit Lvl 10", comment: "Carried my entire Faceit stack. The guy was hitting shots I didn't even know were possible.", rating: 5 },
  { id: 12, user: "Ava S.", rank: "Apex Master", comment: "Very discreet. They appeared offline just like I asked and didn't touch my settings or friends list.", rating: 5 },
  { id: 13, user: "William M.", rank: "Unreal", comment: "Fortnite ranking took no time at all. Zero issues with my account afterwards.", rating: 5 },
  { id: 14, user: "Mia D.", rank: "Champion", comment: "Rocket League duo boost was a blast. Great communication on Discord throughout the whole session.", rating: 5 },
  { id: 15, user: "Ethan F.", rank: "Ascendant", comment: "Valorant act rank secured. First time using a boosting service and I am extremely satisfied.", rating: 5 },
  { id: 16, user: "Isabella G.", rank: "Diamond Tier", comment: "Cheapest prices on the market but the quality is premium. Definitely coming back next season.", rating: 5 },
  { id: 17, user: "Lucas H.", rank: "Master", comment: "They hit the exact win rate they promised. Very clean and professional service all around.", rating: 5 },
  { id: 18, user: "Charlotte K.", rank: "Crimson", comment: "Fast MW3 leveling. Unlocked all the camos I needed while I was asleep!", rating: 5 },
  { id: 19, user: "Benjamin Y.", rank: "Global Elite", comment: "CS2 premier rating skyrocketed. Booster was extremely polite and updated me daily.", rating: 5 },
  { id: 20, user: "Amelia Z.", rank: "Radiant", comment: "Flawless execution. If you are hesitant about buying, just do it. Boosting Nation is totally legit.", rating: 5 }
];

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
            transition={{ duration: 0.5, delay: delayOffset + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative w-full py-16 md:py-24 bg-agency-black z-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/5 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="text-blue-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3 md:mb-4 block">
            <AnimatedWordText text="// Client Testimonials" delayOffset={0} />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight flex flex-wrap justify-center gap-x-2 md:gap-x-3">
             <AnimatedWordText text="Verified" delayOffset={0.2} /> 
             <AnimatedWordText text="Player Feedback" delayOffset={0.3} className="text-white" />
          </h2>
        </div>

        {/* --- INFINITE SCROLLING MARQUEE --- */}
        {/* Adjusted the mask-image for mobile so it doesn't hide too much content on narrow screens */}
        <div className="relative flex overflow-hidden w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
          
          <motion.div
            className="flex gap-4 md:gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ 
              ease: "linear", 
              duration: 60, // Slightly faster for mobile feel, keep 80 or 100 for very slow desktop
              repeat: Infinity 
            }}
          >
            {[...mockReviews, ...mockReviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-4 hover:border-blue-500/30 transition-colors duration-500 w-[280px] md:w-[380px] flex-shrink-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="text-green-500 fill-green-500 w-3 h-3 md:w-4 md:h-4" />
                    ))}
                  </div>
                  <FiCheckCircle className="text-blue-500 w-4 h-4 md:w-5 md:h-5" title="Verified Order" />
                </div>

                <p className="text-white/80 text-xs md:text-sm leading-relaxed italic whitespace-normal">
                  "{review.comment}"
                </p>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <h4 className="text-white font-bold text-sm md:text-base">{review.user}</h4>
                  <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{review.rank}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}