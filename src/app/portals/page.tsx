"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";

type Tab = "facility" | "college";

const collegeImages = [
  { src: "/SJUReport.png", alt: "SJU Player Report", title: "Player Report" },
  { src: "/SJUStats.png", alt: "SJU Team Stats", title: "Team Statistics" },
  { src: "/SJUPostGame.png", alt: "SJU Post-Game", title: "Post-Game" },
  { src: "/SJUStuff+Leader.png", alt: "SJU Stuff+ Leaderboard", title: "Stuff+ Leaderboard" },
];

const facilityImages = [
  { src: "/StuffReport.png", alt: "Facility Stuff Report", title: "Stuff Report" },
  { src: "/StuffALL.png", alt: "Facility Pitch Details", title: "Pitch Details" },
  { src: "/Stuff+Fastball.png", alt: "Facility Stuff+ Fastball", title: "Stuff+ Fastball" },
  { src: "/StrikeLeaderboard.png", alt: "Facility Strike Leaderboard", title: "In Zone % Leaderboard" },
];

export default function PortalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("facility");

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-32 space-y-1"
            >
              <p className="text-[#ffd000] text-xs tracking-[0.4em] uppercase mb-6">Our Portals</p>
              <nav className="flex lg:flex-col gap-2">
                <button
                  onClick={() => setActiveTab("facility")}
                  className={`w-full text-left px-6 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeTab === "facility"
                      ? "bg-[#c41e3a] text-white"
                      : "bg-[#132238]/50 border border-white/10 text-white/80 hover:border-[#c41e3a]/50 hover:text-white"
                  }`}
                >
                  Facility Portal
                </button>
                <button
                  onClick={() => setActiveTab("college")}
                  className={`w-full text-left px-6 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeTab === "college"
                      ? "bg-[#c41e3a] text-white"
                      : "bg-[#132238]/50 border border-white/10 text-white/80 hover:border-[#c41e3a]/50 hover:text-white"
                  }`}
                >
                  College Portal
                </button>
              </nav>
            </motion.div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "facility" && (
                <motion.div
                  key="facility"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-4xl md:text-5xl mb-6">FACILITY PORTAL</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl">
                    The Facility Portal gives training facilities, academies, and clubs a complete analytics command center. 
                    Manage multiple teams, track Trackman sessions across cages and mounds, and deliver professional-grade 
                    reports to coaches and players. Perfect for facilities that want to offer data-driven development 
                    as a core part of their training program.
                  </p>
                  <ul className="space-y-3 text-white/70 mb-12">
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Session management across all your bays and mounds
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Team and player dashboards with Stuff+, strike%, and more
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Custom reports and leaderboards for your facility
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Trackman integration with automatic data sync
                    </li>
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilityImages.map((img, i) => (
                      <motion.div
                        key={img.src}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="rounded-lg overflow-hidden border border-white/10 bg-[#132238]"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <p className="px-4 py-3 text-sm text-white/70 border-t border-white/10">{img.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "college" && (
                <motion.div
                  key="college"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-4xl md:text-5xl mb-6">COLLEGE PORTAL</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl">
                    The College Portal brings pro-level analytics to collegiate programs. Built for NCAA programs like 
                    Saint Joseph&apos;s University, it delivers player reports, Stuff+ leaderboards, strike rate tracking, and 
                    team-wide statistics, all synced from Trackman. Coaches get the insights they need to develop pitchers 
                    and make data-informed decisions throughout the season.
                  </p>
                  <ul className="space-y-3 text-white/70 mb-12">
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Individual player reports with Stuff+ and pitch breakdowns
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Team-wide leaderboards for Stuff+, strikes, and more
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Strike rate and command tracking across sessions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#ffd000]">→</span> Seamless Trackman integration for bullpens and live ABs
                    </li>
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collegeImages.map((img, i) => (
                      <motion.div
                        key={img.src}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="rounded-lg overflow-hidden border border-white/10 bg-[#132238]"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <p className="px-4 py-3 text-sm text-white/70 border-t border-white/10">{img.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
