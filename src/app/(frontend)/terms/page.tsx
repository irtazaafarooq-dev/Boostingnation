import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f14] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-[#121820] border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 className="text-4xl font-heading font-bold text-blue-500 mb-8 uppercase tracking-tight">Terms of Service</h1>
        
        <div className="space-y-6 font-body text-white/70 leading-relaxed text-sm">
          <p>Last Updated: March 2026</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Boosting Nation ("we", "our", "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
          <p>Boosting Nation provides digital gaming services, including rank boosting, coaching, and virtual item unlocking. We are an independent service provider and are not affiliated with, endorsed by, or partnered with any game developers or publishers (e.g., Activision, Riot Games, Blizzard).</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. User Responsibilities & Risks</h2>
          <p>You acknowledge that using third-party boosting services may violate the End User License Agreement (EULA) or Terms of Service of the respective game developers. By purchasing our services, you accept all risks associated with your game accounts, including but not limited to suspensions, bans, or rank resets. Boosting Nation is not responsible for any actions taken against your account by game publishers.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Payment & Delivery</h2>
          <p>Payments are securely processed via our Merchant of Record. Services will commence only after full payment is confirmed. Delivery times are estimates and may vary based on the complexity of the order.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Contact Information</h2>
          <p>For any questions regarding these Terms, please contact us via our Discord server or email us at <span className="text-blue-400">support@boostingnation.com</span>.</p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-blue-500 hover:text-blue-400 font-bold tracking-wide uppercase text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}