"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiStar, FiShield, FiInfo, FiZap, FiClock, FiUser, FiCheckCircle } from "react-icons/fi"; // ✅ Added FiCheckCircle here
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { useAuth, useClerk, useUser } from "@clerk/nextjs"; // ✅ Added useUser for email
import Script from "next/script"; // ✅ Added for Lemon Squeezy script

export default function ProductPage() {
  const pathname = usePathname();
  const pathParts = pathname ? pathname.split("/").filter(Boolean) : [];
  const gameSlug = pathParts[1] || "game";
  const productSlug = pathParts[2] || ""; 
  const formattedGame = gameSlug.toUpperCase();

  const { userId } = useAuth();
  const { user } = useUser(); // ✅ Get user details for checkout email
  const { openSignIn } = useClerk();

  // --- DATABASE STATE ---
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- UI INPUT STATE ---
  const [currentRank, setCurrentRank] = useState("");
  const [currentSR, setCurrentSR] = useState("");
  const [desiredRank, setDesiredRank] = useState("");
  const [desiredSR, setDesiredSR] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [desiredLevel, setDesiredLevel] = useState("");
  const [weaponType, setWeaponType] = useState("");
  const [desiredCamo, setDesiredCamo] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [platform, setPlatform] = useState("PC");
  
  // --- GLOBAL ADDON STATE ---
  const [isExpress, setIsExpress] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [isSelfPlay, setIsSelfPlay] = useState(false);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    async function fetchData() {
      if (!productSlug) {
        setLoading(false); return;
      }
      try {
        const productRes = await fetch(`/api/products?where[slug][equals]=${productSlug}`);
        const productJson = await productRes.json();
        
        if (productJson.docs && productJson.docs.length > 0) {
          setProductData(productJson.docs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productSlug]);

  // --- 2. DYNAMIC PRICE CALCULATION ---
  let calculatedTotalPrice = productData?.basePrice || 0;
  
  if (productData?.globalAddons && productData.serviceType !== 'boosting') {
    let extraPercent = 0;
    
    if (isExpress && productData.globalAddons.allowExpressDelivery) extraPercent += 20; 
    if (isPriority && productData.globalAddons.allowPriorityStart) extraPercent += 15;  
    if (isSelfPlay && productData.globalAddons.allowSelfPlay) extraPercent += 30;       
    
    calculatedTotalPrice = calculatedTotalPrice + (calculatedTotalPrice * (extraPercent / 100));
  }

  // --- 3. CHECKOUT HANDLER (UPDATED FOR LEMON SQUEEZY) ---
  const handleCheckout = async (isOffer) => {
    if (!userId) {
      openSignIn({ forceRedirectUrl: window.location.href });
      return;
    }

    setIsSubmitting(true);

    const requestData = {
      serviceType: productData.serviceType,
      category: productData.category,
      productName: productData.title, // Pass name to LS
      userEmail: user?.primaryEmailAddress?.emailAddress, // Pass email to LS
      additionalInfo, platform, isExpress, isPriority, isSelfPlay
    };

    if (isOffer) {
      Object.assign(requestData, {
        currentRank, desiredRank, currentSR, desiredSR,
        currentLevel, desiredLevel, weaponType, desiredCamo
      });
    } else {
      requestData.price = calculatedTotalPrice.toFixed(2);
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      
      const data = await res.json();

      if (res.ok) {
        // ✅ INTEGRATED LEMON SQUEEZY OVERLAY
        if (data.url) {
          // @ts-ignore
          if (window.LemonSqueezy) {
            // @ts-ignore
            window.LemonSqueezy.Url.Open(data.url);
          } else {
            window.location.href = data.url; // Fallback redirect
          }
        } else {
          // If it's just a Custom Offer (boosting path)
          alert(`Request sent! Your Order ID is ${data.orderId}. Our team will contact you shortly.`);
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Failed to process request", err);
      alert("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <main className="min-h-screen bg-[#0b0f14] flex items-center justify-center pt-32"><div className="text-blue-500 font-bold font-heading text-2xl animate-pulse">Loading Service...</div></main>;
  if (!productData) return <main className="min-h-screen bg-[#0b0f14] flex items-center justify-center pt-32"><div className="text-white/50 font-bold font-heading text-2xl">Service not found.</div></main>;

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white pt-24 md:pt-32 pb-24">
      {/* ✅ Added Lemon Squeezy Script globally */}
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />

      {/* BREADCRUMBS */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8 flex flex-wrap items-center gap-2 text-xs font-body tracking-widest uppercase text-white/50">
        <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link> <FiChevronRight />
        <Link href={`/games/${gameSlug}`} className="hover:text-blue-500 transition-colors">{formattedGame}</Link> <FiChevronRight />
        <span className="text-blue-500">{productData.title}</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col xl:flex-row gap-10 items-start">
        
        {/* =========================================
            LEFT COLUMN: THE MAIN CONFIGURATOR
        ========================================= */}
        <div className="flex-1 w-full">
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
              {productData.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-body text-white/70">
              <span className="flex text-yellow-400"><FiStar className="fill-current"/> 4.9/5</span>
              <span className="flex items-center gap-2 text-blue-400"><FiShield /> 100% Safe</span>
            </div>
          </div>

          {/* ====================================================
              DYNAMIC UI: TRIGGERS BASED ON CATEGORY & SERVICE
          ==================================================== */}
          
          {/* 1. RANK BOOSTING LAYOUT */}
          {productData.category === 'rank-boosting' && productData.serviceType === 'boosting' && (
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CURRENT COLUMN */}
                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Current Status
                  </h3>
                  <div className="mb-5">
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Current Rank</label>
                    <input type="text" placeholder="e.g. Bronze 1" value={currentRank} onChange={(e) => setCurrentRank(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Current SR / Points</label>
                    <input type="number" placeholder="e.g. 1500" value={currentSR} onChange={(e) => setCurrentSR(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>

                {/* DESIRED COLUMN */}
                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Desired Status
                  </h3>
                  <div className="mb-5">
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Desired Rank</label>
                    <input type="text" placeholder="e.g. Gold 3" value={desiredRank} onChange={(e) => setDesiredRank(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Desired SR / Points</label>
                    <input type="number" placeholder="e.g. 3500" value={desiredSR} onChange={(e) => setDesiredSR(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. PRESTIGE LEVELING LAYOUT */}
          {productData.category === 'prestige-leveling' && productData.serviceType === 'boosting' && (
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CURRENT LEVEL */}
                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Current Status
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Current Level</label>
                    <input type="number" placeholder="e.g. 50" value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>

                {/* DESIRED LEVEL */}
                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Desired Status
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Desired Level</label>
                    <input type="number" placeholder="e.g. 150" value={desiredLevel} onChange={(e) => setDesiredLevel(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. WEAPON LEVELING LAYOUT */}
          {productData.category === 'weapon-leveling' && productData.serviceType === 'boosting' && (
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
              
              {/* WEAPON TYPE SELECTION */}
              <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Weapon Details
                </h3>
                <div>
                  <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Type of Weapon</label>
                  <input type="text" placeholder="e.g. M4A1, Kastov 762..." value={weaponType} onChange={(e) => setWeaponType(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* CURRENT VS DESIRED LEVELS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Current Status
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Current Level</label>
                    <input type="number" placeholder="e.g. 1" value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>

                <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Desired Status
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Desired Level</label>
                    <input type="number" placeholder="e.g. Max" value={desiredLevel} onChange={(e) => setDesiredLevel(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 4. CAMO BOOSTING LAYOUT */}
          {productData.category === 'camos' && productData.serviceType === 'boosting' && (
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
              <div className="bg-[#0b0f14] border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                <h3 className="text-lg font-heading font-bold text-blue-500 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Camo Details
                </h3>
                <div>
                  <label className="text-xs font-bold text-blue-500/70 uppercase tracking-wider mb-2 block">Desired Camo</label>
                  <input type="text" placeholder="e.g. Interstellar, Orion, Dark Matter..." value={desiredCamo} onChange={(e) => setDesiredCamo(e.target.value)} className="w-full bg-[#121820] border border-blue-500/20 rounded-lg p-4 text-white font-body outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          )}

          {/* ADDITIONAL INFO */}
          <div className="bg-[#121820] border border-white/5 rounded-2xl p-6 md:p-10 mb-12 shadow-xl">
            <h3 className="text-lg font-heading font-bold text-white mb-6">Provide any additional information</h3>
            <textarea 
              rows={3}
              placeholder="e.g. I need it done in a week..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-[#0b0f14] border border-white/10 rounded-xl p-5 text-white font-body outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-white/30"
            />
          </div>

          {/* Description & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-8 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2"><FiInfo className="text-blue-500" /> Description</h3>
              <p className="text-white/60 font-body text-sm leading-relaxed whitespace-pre-wrap">{productData.description}</p>
            </div>
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-8 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2"><FiShield className="text-blue-500" /> Requirements</h3>
              <ul className="flex flex-col gap-3">
                {productData.requirements?.map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60 font-body"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /> {req.requirement}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ NEW: HOW IT WORKS SECTION JUST FOR YOU */}
          {productData.howItWorks && productData.howItWorks.length > 0 && (
            <div className="bg-[#121820] border border-white/5 rounded-2xl p-8 shadow-xl mb-12">
              <h3 className="font-heading font-bold text-xl text-white mb-8 flex items-center gap-2">
                <FiCheckCircle className="text-blue-500" /> How It Works
              </h3>
              <div className="space-y-6">
                {productData.howItWorks.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold font-heading flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5 font-heading tracking-wide">{step.stepTitle}</h4>
                      <p className="text-sm text-white/60 font-body leading-relaxed">{step.stepDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* =========================================
            RIGHT COLUMN: CHECKOUT & ADDONS (CARD UI)
        ========================================= */}
        <div className="w-full xl:w-[400px] flex-shrink-0 sticky top-32">
          <div className="bg-[#121820] border border-white/5 rounded-2xl p-8 shadow-2xl">
            
            {/* PLATFORM SELECTOR */}
            {productData.serviceType === 'boosting' && (
              <div className="mb-10 pb-10 border-b border-white/10">
                <label className="text-base font-heading font-bold text-white mb-5 block tracking-wide">Select Platform</label>
                <div className="grid grid-cols-3 gap-4">
                  {["PC", "PS", "Xbox"].map(plat => (
                    <button 
                      key={plat} 
                      onClick={() => setPlatform(plat)} 
                      className={`py-5 rounded-xl flex justify-center items-center transition-all duration-300 ${
                        platform === plat 
                          ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
                          : "bg-[#0b0f14] text-white/40 hover:bg-[#1a2230] hover:text-white/70"
                      }`}
                    >
                      {plat === "PC" && <FaWindows className="w-6 h-6" />}
                      {plat === "PS" && <FaPlaystation className="w-6 h-6" />}
                      {plat === "Xbox" && <FaXbox className="w-6 h-6" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GLOBAL ADDONS */}
            {productData.globalAddons && (
              <div className="mb-8 flex flex-col gap-4">
                <label className="text-base font-heading font-bold text-white mb-2 block tracking-wide">Order Add-ons</label>
                
                {productData.globalAddons.allowExpressDelivery && (
                  <div onClick={() => setIsExpress(!isExpress)} className={`cursor-pointer rounded-xl p-4 flex items-center gap-4 border transition-all duration-300 ${isExpress ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-white/5 bg-[#0b0f14] hover:border-white/20'}`}>
                    <div className={`p-2.5 rounded-lg transition-colors ${isExpress ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'}`}>
                      <FiZap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold font-heading ${isExpress ? 'text-white' : 'text-white/80'}`}>Express Delivery</div>
                      <div className="text-xs text-white/50 font-body mt-0.5">Speed up order completion</div>
                    </div>
                  </div>
                )}

                {productData.globalAddons.allowPriorityStart && (
                  <div onClick={() => setIsPriority(!isPriority)} className={`cursor-pointer rounded-xl p-4 flex items-center gap-4 border transition-all duration-300 ${isPriority ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-white/5 bg-[#0b0f14] hover:border-white/20'}`}>
                    <div className={`p-2.5 rounded-lg transition-colors ${isPriority ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'}`}>
                      <FiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold font-heading ${isPriority ? 'text-white' : 'text-white/80'}`}>Priority Start</div>
                      <div className="text-xs text-white/50 font-body mt-0.5">Your order starts immediately</div>
                    </div>
                  </div>
                )}

                {productData.globalAddons.allowSelfPlay && (
                  <div onClick={() => setIsSelfPlay(!isSelfPlay)} className={`cursor-pointer rounded-xl p-4 flex items-center gap-4 border transition-all duration-300 ${isSelfPlay ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-white/5 bg-[#0b0f14] hover:border-white/20'}`}>
                    <div className={`p-2.5 rounded-lg transition-colors ${isSelfPlay ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'}`}>
                      <FiUser className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold font-heading ${isSelfPlay ? 'text-white' : 'text-white/80'}`}>Selfplay</div>
                      <div className="text-xs text-white/50 font-body mt-0.5">Play on your own account</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DYNAMIC CHECKOUT ACTION BOX */}
            {productData.serviceType === 'boosting' ? (
              <div className="bg-[#080b0f] rounded-2xl p-6 border border-white/5 mt-8">
                <p className="text-sm text-white/50 text-center mb-6 leading-relaxed px-2 font-body">
                  Submit your current details to receive a custom price offer from our team via live chat.
                </p>
                <button onClick={() => handleCheckout(true)} disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold font-heading py-4 rounded-xl transition-all duration-300 text-base uppercase tracking-wider flex justify-center items-center shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Get Offer Now"}
                </button>
              </div>
            ) : (
              <div className="bg-[#080b0f] rounded-2xl p-6 border border-white/5 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-body text-white/50 uppercase tracking-wider">Total Price</span>
                  <span className="text-3xl font-heading font-bold text-blue-500">
                    ${calculatedTotalPrice.toFixed(2)}
                  </span>
                </div>
                <button onClick={() => handleCheckout(false)} disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold font-heading py-4 rounded-xl transition-all duration-300 text-base uppercase tracking-wider flex justify-center items-center shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Processing..." : "Buy Now"}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  );
}