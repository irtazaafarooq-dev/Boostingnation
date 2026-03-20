import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#0b0f14] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-[#121820] border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 className="text-4xl font-heading font-bold text-blue-500 mb-8 uppercase tracking-tight">Refund Policy</h1>
        
        <div className="space-y-6 font-body text-white/70 leading-relaxed text-sm">
          <p>Last Updated: March 2026</p>
          <p>Because Boosting Nation provides digital services and intangible goods, we have a strict refund policy to protect our team and our customers.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Full Refunds</h2>
          <p>You are eligible for a 100% full refund under the following conditions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You cancel your order <strong>before</strong> our booster has been assigned and the service has started.</li>
            <li>We are unable to complete the service due to technical limitations on our end.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Partial Refunds</h2>
          <p>If you decide to cancel an order <strong>after</strong> the service has already begun, you may be eligible for a partial refund. The refund amount will be calculated based on the percentage of the service that has already been completed by our booster.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Non-Refundable Situations</h2>
          <p>Refunds will <strong>NOT</strong> be issued in the following scenarios:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The service has been 100% completed as requested.</li>
            <li>Your game account is suspended or banned during or after the service (as outlined in our Terms of Service, you accept the risks of boosting).</li>
            <li>You provided incorrect account details or platform information that resulted in service delays, and the service has already been initiated.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Dispute Resolution</h2>
          <p>Before initiating a chargeback with your bank or credit card company, we strongly encourage you to contact our support team. Fraudulent chargebacks will result in a permanent ban from our services and may be disputed with provided evidence of service completion.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Requesting a Refund</h2>
          <p>To request a refund, please open a ticket in our Discord server or email us at <span className="text-blue-400">support@boostingnation.com</span> with your Order ID.</p>
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