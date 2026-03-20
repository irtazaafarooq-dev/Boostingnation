"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FiShield, FiTrendingDown, FiVideo, FiCreditCard, 
  FiLock, FiMessageCircle, FiAward, FiGlobe 
} from "react-icons/fi";

// --- HELPER COMPONENT: REUSABLE SPLIT TEXT ANIMATION ---
const AnimatedWordText = ({ text, delayOffset = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
          <motion.span
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: delayOffset + index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const features = [
  { id: 1, title: "295K+ Orders", subtitle: "Successfully Completed Orders", icon: FiGlobe, imageSrc: "/features/dragon1.png", accentColor: "from-teal-500/20 to-transparent", iconColor: "text-teal-400" },
  { id: 2, title: "Safe with VPN", subtitle: "All Boosters Use VPN for Extra Safety", icon: FiShield, imageSrc: "/features/vpn.png", accentColor: "from-green-500/20 to-transparent", iconColor: "text-green-400" },
  { id: 3, title: "Best Prices", subtitle: "Find a lower price? We won't just match it — we'll beat it!", icon: FiTrendingDown, imageSrc: "/features/cheap.png", accentColor: "from-emerald-500/20 to-transparent", iconColor: "text-emerald-400" },
  { id: 4, title: "Private Streams", subtitle: "You will be able to watch private stream on Twitch", icon: FiVideo, imageSrc: "/features/stream.png", accentColor: "from-purple-500/20 to-transparent", iconColor: "text-purple-400" },
  { id: 5, title: "30+ Payments", subtitle: "All Payments Covered by Customer Protection Programs", icon: FiCreditCard, imageSrc: "/features/panda.png", accentColor: "from-blue-500/20 to-transparent", iconColor: "text-blue-400" },
  { id: 6, title: "Safe Data", subtitle: "Your data is protected by SSL certificate", icon: FiLock, imageSrc: "/features/safe.png", accentColor: "from-red-500/20 to-transparent", iconColor: "text-red-400" },
  { id: 7, title: "24/7 Support", subtitle: "Our support team is ready to help you 24/7", icon: FiMessageCircle, imageSrc: "/features/reliable.png", accentColor: "from-cyan-500/20 to-transparent", iconColor: "text-cyan-400" },
  { id: 8, title: "Elite Players", subtitle: "Only the Top 0.1% of players handle your account", icon: FiAward, imageSrc: "/features/elite.png", accentColor: "from-amber-500/20 to-transparent", iconColor: "text-amber-400" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-24 bg-agency-black z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            <AnimatedWordText text="// Why Boosting Nation" delayOffset={0} />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-tight flex gap-3">
             <AnimatedWordText text="Trust &" delayOffset={0.2} /> 
             <AnimatedWordText text="Security" delayOffset={0.3} className="text-white" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex items-center overflow-hidden rounded-2xl md:rounded-3xl bg-[#121212] border border-white/5 hover:border-white/20 transition-all duration-500 min-h-[160px] md:min-h-[200px]"
              >
                
                {/* --- CONTENT AREA --- */}
                {/* Mobile: items-start and text-left. Desktop (md): stays items-start and text-left. */}
                <div className="relative z-20 w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center items-start text-left pointer-events-none">
                  <div className="mb-2">
                    <AnimatedWordText 
                      text={feature.title} 
                      delayOffset={0.1 + (index * 0.05)} 
                      className="font-heading text-xl md:text-3xl font-black md:font-bold text-white leading-tight uppercase" 
                    />
                  </div>
                  <div>
                    <AnimatedWordText 
                      text={feature.subtitle} 
                      delayOffset={0.3 + (index * 0.05)} 
                      className="text-white/80 md:text-white/50 text-xs md:text-sm font-bold md:font-normal font-body leading-relaxed max-w-[95%] md:max-w-[85%]" 
                    />
                  </div>
                </div>

                {/* --- VISUALS AREA --- */}
                <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2 h-full overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_40%)]">
                  
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.accentColor} opacity-50 group-hover:opacity-100 transition-opacity duration-700 blur-xl z-0`} />
                  
                  {feature.imageSrc ? (
                    <Image 
                      src={feature.imageSrc} 
                      alt={feature.title} 
                      fill 
                      // Mobile: Updated opacity to 30%. Desktop stays at 60%.
                      className="object-cover opacity-30 md:opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 md:inset-auto md:-right-4 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center md:block transform transition-all duration-700 ease-out 
                                    opacity-30 md:opacity-100 scale-[1.5] md:scale-100 group-hover:scale-[1.7] md:group-hover:scale-[1.2] 
                                    rotate-12 group-hover:-rotate-6 z-10"
                    >
                      <Icon 
                        className={`w-40 h-40 md:w-48 md:h-48 ${feature.iconColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`} 
                        strokeWidth={1}
                      />
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}