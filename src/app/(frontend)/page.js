import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsBanner from "@/components/StatsBanner"; // <-- Import it
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-agency-black text-agency-white overflow-hidden">
      
      <Hero />
      <ProductGrid />
      <WhyChooseUs />
      <StatsBanner /> {/* <-- Drop it in here */}
      <ReviewsSection /> {/* <-- And here */}
    </main>
  );
}