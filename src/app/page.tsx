"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div className="bg-[#0a1628] text-white min-h-screen">
      <Nav />

      {/* Hero - Full screen, cinematic */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden grid-overlay"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(196,30,58,0.15),transparent)]" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-6"
          >
            Data-Driven Development
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight mb-8"
          >
            <span className="text-white">DEVELOP</span>
            <br />
            <span className="gradient-text">THE GAME</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Unlock player potential with cutting-edge analytics, Stuff+ technology, and Trackman integration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/products"
              className="px-10 py-4 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-all rounded-sm"
            >
              Shop Products
            </Link>
            <a
              href="#platform"
              className="px-10 py-4 border-2 border-white text-white font-semibold tracking-wider uppercase hover:bg-white hover:text-[#0a1628] transition-all rounded-sm"
            >
              Explore Platform
            </a>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1 h-1 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Platform Section - Split layout */}
      <section id="platform" className="min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-4">What We Build</p>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-tight">
              <span className="text-white">OUR</span>{" "}
              <span className="text-[#c41e3a]">PLATFORM</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Stuff+ Analyzer", desc: "Professional-grade pitch analytics. Evaluate quality with metrics used at the highest levels.", icon: "📊", delay: 0 },
              { title: "Team Portal", desc: "Trackman integration, custom reports, leaderboards. Give your team the data edge.", icon: "📈", delay: 0.1 },
              { title: "Player Analytics", desc: "Stuff+ reports, college portals. From high school to pro, reach the next level.", icon: "🎯", delay: 0.2 },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                className="group relative bg-[#132238]/80 backdrop-blur border border-white/10 rounded p-10 hover:border-[#c41e3a]/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c41e3a]/10 rounded-full blur-3xl group-hover:bg-[#c41e3a]/20 transition-colors" />
                <span className="text-4xl mb-6 block">{item.icon}</span>
                <h3 className="font-display text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
                <div className="mt-6 h-px w-0 bg-[#ffd000] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Full width statement */}
      <section id="about" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#132238] via-[#0a1628] to-[#132238]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-20 items-center"
          >
            <div>
              <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-6">Who We Are</p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-white mb-8">
                BEHIND THE DATA
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Developing Baseball was built by people who love the game and understand the power of data. We combine advanced analytics with real coaching experience.
              </p>
              <p className="text-white/70 leading-relaxed">
                From Stuff+ modeling to Trackman integration, we&apos;re bringing pro-level technology to every level of the sport.
              </p>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[4/3] max-w-3xl mx-auto rounded-lg overflow-hidden bg-[#132238] border border-white/10 relative w-full"
              >
                <Image src="/wheeler.png" alt="Developing Baseball - Data-driven development" fill className="object-contain" sizes="(max-width: 768px) 100vw, 60vw" />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#ffd000] rounded-lg -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section id="trusted" className="py-16 px-6 relative border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-8 text-center"
          >
            Trusted By
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div className="relative aspect-square rounded-lg bg-white p-6 border border-gray-200">
              <Image src="/sju.png" alt="Saint Joseph's University" fill className="object-contain" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-square rounded-lg bg-white p-6 border border-gray-200 overflow-hidden">
              <div className="absolute inset-[-20%]">
                <Image src="/Bpclogoclear.png" alt="Baseball Performance Center" fill className="object-contain" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className="relative aspect-square rounded-lg bg-white p-6 border border-gray-200 overflow-hidden">
              <div className="absolute inset-[-15%]">
                <Image src="/ascent_logo.png" alt="Ascent" fill className="object-contain" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className="relative aspect-square rounded-lg bg-white p-6 border border-gray-200 overflow-hidden">
              <div className="absolute inset-[-20%]">
                <Image src="/taclogonew.png" alt="Total Arm Care" fill className="object-contain" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-4">Our Team</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-white">
              MEET THE FOUNDER
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="shrink-0">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-2 border-white/20">
                  <Image
                    src="/Rimerman_HS.png"
                    alt="Alex Rimerman, Founder of Developing Baseball"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-display text-3xl text-white mb-2">Alex Rimerman</h3>
                <p className="text-[#ffd000] font-semibold mb-6">Founder</p>
                <p className="text-white/80 mb-4">
                  Swarthmore College &apos;25 · Double major in Computer Science and Applied Mathematics
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Alex played baseball at Swarthmore College as a pitcher where he developed a passion for data and advanced analytics. He started Developing Baseball to put these insights in the hands of more people, making pro-level metrics accessible to players and coaches at every level.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram / Connect - Bold CTA */}
      <section id="connect" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(196,30,58,0.2),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-6"
          >
            Join the Community
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(3rem,8vw,5rem)] leading-tight mb-8"
          >
            <span className="text-white">FOLLOW</span>{" "}
            <span className="gradient-text">OUR JOURNEY</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/70 text-xl mb-8 max-w-2xl mx-auto"
          >
            Training tips, analytics insights, and the latest from Developing Baseball.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link
              href="/contact"
              className="px-10 py-4 border-2 border-white text-white font-semibold tracking-wider uppercase hover:bg-white hover:text-[#0a1628] transition-all rounded-sm"
            >
              Contact Us
            </Link>
            <motion.a
              href="https://www.instagram.com/developingbaseball/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-semibold tracking-wider uppercase rounded-sm hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @developingbaseball
            </motion.a>
            <motion.a
              href="https://twitter.com/developbaseball"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#1DA1F2] text-white font-semibold tracking-wider uppercase rounded-sm hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @developbaseball
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Developing Baseball" width={36} height={36} className="h-9 w-auto opacity-90" />
            <span className="font-display text-lg tracking-[0.15em] text-white/80">DEVELOPING BASEBALL</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/products" className="text-sm text-white/60 hover:text-[#ffd000] transition-colors">Shop</Link>
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
