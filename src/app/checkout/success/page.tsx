import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 rounded-full bg-[#132238] border-2 border-[#ffd000] flex items-center justify-center mx-auto mb-10 text-5xl">
          ✓
        </div>
        <h1 className="font-display text-5xl md:text-6xl text-white mb-4 tracking-tight">THANK YOU</h1>
        <p className="text-white/70 text-lg mb-10">
          Your purchase was successful. Check your email for confirmation and next steps.
        </p>
        <Link
          href="/products"
          className="inline-block px-10 py-4 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-colors rounded-sm"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
