"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "/products", label: "Shop" },
  { href: "/portals", label: "Portals" },
  { href: "/#platform", label: "Platform" },
  { href: "/#about", label: "About" },
  { href: "/#team", label: "Team" },
  { href: "/#connect", label: "Connect" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <Image src="/logo.png" alt="Developing Baseball" width={40} height={40} className="h-8 w-auto sm:h-10 shrink-0" />
          <span className="font-display text-sm sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-white truncate">DEVELOPING BASEBALL</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.startsWith("/#") ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase hover:text-[#ffd000] transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm tracking-widest uppercase hover:text-[#ffd000] transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            href="/try-model"
            className="px-5 py-2.5 border border-white rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-[#0a1628] transition-all"
          >
            Try Our Model
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 text-white hover:text-[#ffd000] transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a1628]/98 backdrop-blur md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center min-h-screen gap-8 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) =>
                link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl tracking-widest uppercase text-white hover:text-[#ffd000] transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl tracking-widest uppercase text-white hover:text-[#ffd000] transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
              <Link
                href="/try-model"
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl tracking-widest uppercase text-[#ffd000]"
              >
                Try Our Model
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
