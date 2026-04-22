"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import type { PortalCardPayload } from "@/lib/customer-portals";

type Props = {
  portals: PortalCardPayload[];
  requireUnlock: boolean;
  initiallyUnlocked: boolean;
};

export default function PortalHubClient({
  portals,
  requireUnlock,
  initiallyUnlocked,
}: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const showGate = requireUnlock && !initiallyUnlocked;

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/customer-portals/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Something went wrong");
        return;
      }
      setPassword("");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center mb-14"
          >
            <p className="text-[#ffd000] text-xs tracking-[0.4em] uppercase mb-4">Customer access</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">MY PORTALS</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Launch your organization&apos;s live Shiny apps on shinyapps.io. Set{" "}
              <code className="text-white/90 text-xs bg-white/10 px-1.5 py-0.5 rounded">PORTAL_HUB_SECRET</code>{" "}
              if you want a password before links appear.
            </p>
          </motion.div>

          {showGate && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleUnlock}
              className="max-w-md mx-auto mb-16 p-8 rounded-lg border border-white/10 bg-[#132238]/80 backdrop-blur"
            >
              <label htmlFor="portal-hub-password" className="block text-sm text-white/80 mb-2 tracking-wide uppercase">
                Portal access password
              </label>
              <input
                id="portal-hub-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-sm bg-[#0a1628] border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffd000] mb-4"
                placeholder="Enter password"
              />
              {error && <p className="text-sm text-[#c41e3a] mb-4">{error}</p>}
              <button
                type="submit"
                disabled={pending || !password.trim()}
                className="w-full py-3 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase rounded-sm hover:bg-[#9e1830] transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                {pending ? "Checking…" : "Unlock portals"}
              </button>
            </motion.form>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portals.map((portal, i) => (
              <motion.article
                key={portal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="flex flex-col rounded-lg border border-white/10 bg-[#132238]/60 overflow-hidden hover:border-[#c41e3a]/40 transition-colors"
              >
                <div className="relative h-36 bg-white p-6 flex items-center justify-center">
                  {portal.logo ? (
                    <div className="relative w-full h-full max-h-24">
                      <Image
                        src={portal.logo}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <span className="font-display text-xl sm:text-2xl tracking-wide text-[#0a1628] text-center px-2">
                      {portal.logoInitials ?? "Portal"}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-xl text-white mb-1">{portal.title}</h2>
                  <p className="text-[#ffd000] text-xs tracking-wider uppercase mb-3">{portal.subtitle}</p>
                  <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6">{portal.description}</p>
                  {portal.url ? (
                    showGate ? (
                      <span className="inline-flex justify-center items-center py-3 px-4 rounded-sm bg-white/10 text-white/40 font-semibold tracking-wider uppercase cursor-not-allowed text-center">
                        Unlock to launch
                      </span>
                    ) : (
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center py-3 px-4 rounded-sm bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-colors text-center"
                      >
                        Open in Shiny
                      </a>
                    )
                  ) : (
                    <span className="inline-flex justify-center items-center py-3 px-4 rounded-sm border border-white/15 text-white/45 text-sm font-semibold tracking-wider uppercase text-center">
                      URL not configured
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-14 text-center text-white/50 text-sm max-w-xl mx-auto"
          >
            Need access or a new portal?{" "}
            <Link href="/contact" className="text-[#ffd000] hover:underline">
              Contact us
            </Link>
            . See product overview on the{" "}
            <Link href="/portals" className="text-[#ffd000] hover:underline">
              Portals
            </Link>{" "}
            page.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
