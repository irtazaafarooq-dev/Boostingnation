import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default async function GamePage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  const currentType = resolvedSearchParams?.type || "boosting";
  const currentCategory = resolvedSearchParams?.category || "all";

  // --- FETCH DATA (Filtered by Game AND Service Type) ---
  const [gameRes, productsRes] = await Promise.all([
  fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/games?where[slug][equals]=${slug}`, { cache: 'no-store' }),
  fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/products?where[gameSlug][equals]=${slug}&where[serviceType][equals]=${currentType}`, { cache: 'no-store' })
]);

  const gameData = await gameRes.json();
  const productsData = await productsRes.json();

  const game = gameData.docs?.[0];
  const allProducts = productsData.docs || [];

  const formattedTitle = game ? game.title : slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const imageSrc = typeof game?.image === 'object' && game?.image?.url 
    ? game.image.url 
    : `/${slug}.png`;

  // --- CATEGORIES (Only for Boosting) ---
  const boostingCategories = [
    { id: "all", name: "All Services", href: `/games/${slug}?type=boosting` },
    { id: "rank-boosting", name: "Rank Boosting", href: `/games/${slug}?type=boosting&category=rank-boosting` },
    { id: "leveling", name: "Guns and Prestige Leveling", href: `/games/${slug}?type=boosting&category=leveling` },
    { id: "camos", name: "Camo Boosting", href: `/games/${slug}?type=boosting&category=camos` },
  ];

  const displayedProducts = currentCategory === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === currentCategory);

  return (
    <main className="min-h-screen bg-[#0b0f14] text-agency-white pt-24 md:pt-32 pb-24">
      
      {/* --- BREADCRUMBS --- */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8 flex flex-wrap items-center gap-2 text-xs font-body tracking-widest uppercase text-white/50">
        <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
        <FiChevronRight />
        <Link href="/#games-section" className="hover:text-blue-500 transition-colors">Games</Link>
        <FiChevronRight />
        <span className="text-blue-500">{formattedTitle}</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8 text-center uppercase tracking-tight">
          {formattedTitle}
        </h1>

        {/* =========================================
            THE MASTER TABS (Redesigned: Sleek & Minimalist)
        ========================================= */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 border-b border-white/10">
          <Link 
            href={`/games/${slug}?type=boosting`} 
            className={`pb-4 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-300 border-b-2 ${
              currentType === 'boosting' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-white/50 hover:text-white hover:border-white/30'
            }`}
          >
            Boosting
          </Link>
          <Link 
            href={`/games/${slug}?type=accounts`} 
            className={`pb-4 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-300 border-b-2 ${
              currentType === 'accounts' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-white/50 hover:text-white hover:border-white/30'
            }`}
          >
            Accounts
          </Link>
          <Link 
            href={`/games/${slug}?type=topups`} 
            className={`pb-4 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-300 border-b-2 ${
              currentType === 'topups' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-white/50 hover:text-white hover:border-white/30'
            }`}
          >
            Top-ups
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full">
        
        {/* =========================================
            HORIZONTAL PILL CATEGORIES (Centered)
        ========================================= */}
        {currentType === 'boosting' && (
          <div className="w-full mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Added mx-auto here to perfectly center the pills */}
            <div className="flex items-center justify-center gap-3 w-max mx-auto px-2">
              {boostingCategories.map((category) => {
                const isActive = currentCategory === category.id;
                return (
                  <Link 
                    key={category.id} 
                    href={category.href}
                    className={`px-5 py-2.5 rounded-full text-sm font-body font-bold transition-all duration-300 border ${
                      isActive 
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        : "bg-[#121820] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* --- PRODUCT GRID --- */}
        <div className="w-full mt-4">
          {!displayedProducts || displayedProducts.length === 0 ? (
            <div className="w-full py-24 text-center border border-dashed border-white/10 bg-[#121820] rounded-xl flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">🎮</span>
              <h3 className="font-heading font-bold text-xl text-white mb-2">No {currentType} available yet!</h3>
              <p className="text-white/50 font-body text-sm">Check back soon or contact support for custom requests.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/games/${slug}/${product.slug}`}
                  className="bg-[#121820] border border-white/5 hover:border-blue-500/30 rounded-xl overflow-hidden flex flex-col transition-all duration-300 group block cursor-pointer"
                >
                  <div className="relative w-full h-[200px] bg-black/50 overflow-hidden">
                    <Image 
                      src={imageSrc} 
                      alt={product.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider z-10">
                      {currentType}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121820] via-transparent to-transparent z-0" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-lg text-white mb-4 leading-tight">
                      {product.title}
                    </h3>
                    <ul className="flex flex-col gap-2 mb-6 flex-1">
                      {product.requirements?.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-body text-white/60">
                          <span className="text-blue-500 mt-[2px]">•</span>
                          {req.requirement}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      
                      {/* Only show price if the type is NOT 'boosting' */}
                      {currentType !== 'boosting' && (
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xs text-white/50 font-body">from</span>
                          <span className="text-xl font-bold text-blue-500">${(product.basePrice || 0).toFixed(2)}</span>
                        </div>
                      )}

                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold font-body text-sm py-3 rounded transition-colors uppercase tracking-wide">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}