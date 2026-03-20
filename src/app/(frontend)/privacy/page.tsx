import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0f14] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-[#121820] border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 className="text-4xl font-heading font-bold text-blue-500 mb-8 uppercase tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-6 font-body text-white/70 leading-relaxed text-sm">
          <p>Last Updated: March 2026</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information necessary to provide our digital services. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact Information (Email address, Discord ID)</li>
            <li>Gaming Information (In-game usernames, current ranks, platform details)</li>
            <li>Technical Data (IP address, browser type for security and fraud prevention)</li>
          </ul>
          <p><strong>Note:</strong> We do NOT store your credit card details. All financial transactions are securely handled by our encrypted payment gateway (Lemon Squeezy).</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>Your data is used strictly for fulfilling your orders, communicating updates regarding your service, providing customer support, and improving our website experience.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Data Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share necessary game details with our verified boosters solely for the purpose of completing your requested service. All boosters are bound by strict confidentiality agreements.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Account Security</h2>
          <p>If you provide account credentials for "Piloted" (Self-Play) services, we highly recommend changing your password immediately after the service is completed. We use industry-standard encryption to protect your data while in our possession.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or wish to request the deletion of your data, please contact <span className="text-blue-400">support@boostingnation.com</span>.</p>
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