"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import Nav from "@/components/Nav";

function ProductVideo({ src, productName }: { src: string; productName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0a1628]">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        playsInline
        muted
        loop
        autoPlay
        controls
      />
      <button
        onClick={handleFullscreen}
        className="absolute bottom-3 right-3 p-2 rounded bg-black/60 hover:bg-black/80 transition-colors"
        aria-label={`View ${productName} fullscreen`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
      </button>
    </div>
  );
}

function formatPrice(product: (typeof products)[0]) {
  if (product.contactForPricing) return "Contact for pricing";
  if (product.priceLabel) return product.priceLabel;
  if (product.price === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);
}

export default function ProductsPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCheckout = async (product: (typeof products)[0]) => {
    if (product.contactForPricing) {
      window.location.href = "/contact";
      return;
    }
    if (product.priceId.startsWith("price_YOUR_ID") || !product.priceId) {
      alert("Please add your Stripe Price IDs in the Stripe Dashboard and update src/lib/products.ts");
      return;
    }

    setLoadingId(product.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />

      {/* Products Section */}
      <section className="pt-40 pb-32 px-6 grid-overlay">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-4">Shop</p>
            <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-tight mb-6">
              <span className="text-white">PRODUCTS</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl">
              Unlock your potential with our analytics tools and team platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#132238]/80 backdrop-blur border border-white/10 rounded overflow-hidden hover:border-[#c41e3a]/50 transition-all duration-500"
              >
                <div className="aspect-video bg-[#0a1628] relative overflow-hidden">
                  {product.video ? (
                    <ProductVideo src={product.video} productName={product.name} />
                  ) : product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <>
                      <span className="font-display text-8xl text-white/5">⚾</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132238] to-transparent opacity-60" />
                    </>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-white mb-3">{product.name}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <span className="font-display text-2xl text-[#ffd000]">{formatPrice(product)}</span>
                    <button
                      onClick={() => handleCheckout(product)}
                      disabled={loadingId === product.id && !product.contactForPricing}
                      className="px-6 py-3 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                    >
                      {product.contactForPricing ? "Contact" : loadingId === product.id ? "Loading..." : "Subscribe"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Developing Baseball" width={36} height={36} className="h-9 w-auto opacity-80" />
            <span className="font-display text-lg tracking-[0.15em] text-white/80">DEVELOPING BASEBALL</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/contact" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Contact</Link>
            <Link href="/privacy" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Terms</Link>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Developing Baseball
          </p>
        </div>
      </footer>
    </div>
  );
}
