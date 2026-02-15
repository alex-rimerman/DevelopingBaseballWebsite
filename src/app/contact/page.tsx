"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "Failed to send");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Developing Baseball" width={40} height={40} className="h-10 w-auto" />
          <span className="font-display text-xl tracking-[0.2em]">DEVELOPING BASEBALL</span>
        </Link>
        <Link href="/" className="text-sm tracking-widest uppercase hover:text-[#ffd000] transition-colors">
          Back
        </Link>
      </nav>

      <section className="pt-40 pb-32 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-4">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl mb-6">CONTACT US</h1>
            <p className="text-white/70 mb-12">
              Interested in our tools for your team or organization? Drop us a message, we&apos;d love to hear from you.
            </p>

            {status === "success" ? (
              <div className="bg-[#132238] border border-[#ffd000]/30 rounded p-8 text-center">
                <p className="text-[#ffd000] font-semibold mb-2">Message sent!</p>
                <p className="text-white/70 text-sm">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white placeholder-white/40 focus:border-[#ffd000] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white placeholder-white/40 focus:border-[#ffd000] focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white placeholder-white/40 focus:border-[#ffd000] focus:outline-none transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                {status === "error" && (
                  <p className="text-[#c41e3a] text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-8 py-4 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Terms</Link>
          </div>
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} Developing Baseball</p>
        </div>
      </footer>
    </div>
  );
}
