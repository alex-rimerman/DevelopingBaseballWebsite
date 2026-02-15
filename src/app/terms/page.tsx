import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors mb-12 inline-block">
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl mb-8">TERMS OF SERVICE</h1>
        <p className="text-white/60 text-sm mb-12">Last updated: {new Date().toLocaleDateString("en-US")}</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">1. Acceptance of Terms</h2>
            <p>
              By using the Developing Baseball website and services, you agree to these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">2. Services</h2>
            <p>
              Developing Baseball provides analytics tools, mobile applications, and team platforms for baseball development. We reserve the right to modify or discontinue services at any time.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">3. Purchases & Refunds</h2>
            <p>
              All purchases are processed through Stripe. Refund requests will be handled in accordance with our refund policy. Contact us at{" "}
              <a href="mailto:alex.rimerman@gmail.com" className="text-[#ffd000] hover:underline">alex.rimerman@gmail.com</a> for refund inquiries.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">4. User Conduct</h2>
            <p>
              You agree to use our services lawfully and not to misuse, abuse, or attempt to gain unauthorized access to our systems or data.
            </p>
          </section>
          <section>
            <h2 className="text-white font-semibold text-lg mb-4">5. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:alex.rimerman@gmail.com" className="text-[#ffd000] hover:underline">alex.rimerman@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
