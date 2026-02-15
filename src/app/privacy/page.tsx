import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors mb-12 inline-block">
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl mb-8">PRIVACY POLICY</h1>
        <p className="text-white/60 text-sm mb-12">Last updated: {new Date().toLocaleDateString("en-US")}</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide when contacting us, making a purchase, or using our services. This may include your name, email address, payment information (processed securely by Stripe), and any messages you send us.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">2. How We Use Your Information</h2>
            <p>
              We use your information to process orders, respond to inquiries, improve our services, and send relevant updates about Developing Baseball. We do not sell your personal information to third parties.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">3. Payment Processing</h2>
            <p>
              Payments are processed by Stripe. We do not store your full credit card details. Stripe&apos;s privacy policy applies to payment data:{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#ffd000] hover:underline">stripe.com/privacy</a>.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">4. Cookies & Analytics</h2>
            <p>
              We may use cookies and similar technologies to improve your experience. You can disable cookies in your browser settings.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">5. Contact</h2>
            <p>
              For questions about this privacy policy, contact us at{" "}
              <a href="mailto:alex.rimerman@gmail.com" className="text-[#ffd000] hover:underline">alex.rimerman@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
