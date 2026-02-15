"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";

const PITCH_TYPES = [
  { value: "FF", label: "Fastball (FF)" },
  { value: "SL", label: "Slider (SL)" },
  { value: "CU", label: "Curveball (CU)" },
  { value: "CH", label: "Changeup (CH)" },
  { value: "FC", label: "Cutter (FC)" },
  { value: "SI", label: "Sinker (SI)" },
  { value: "FS", label: "Splitter (FS)" },
  { value: "ST", label: "Sweeper (ST)" },
  { value: "KC", label: "Knuckle-Curve (KC)" },
];

const FIELDS = [
  { key: "release_speed", label: "Release Speed (mph)", placeholder: "92" },
  { key: "pfx_x", label: "Horizontal Break (in)", placeholder: "8" },
  { key: "pfx_z", label: "Induced Vertical Break (in)", placeholder: "18" },
  { key: "release_extension", label: "Release Extension (ft)", placeholder: "6.2" },
  { key: "release_spin_rate", label: "Spin Rate (rpm)", placeholder: "2400" },
  { key: "spin_axis", label: "Spin Axis (12=180, 3=270, 6=0/360, 9=90)", placeholder: "180" },
  { key: "release_pos_x", label: "Release Side (ft)", placeholder: "1.5" },
  { key: "release_pos_z", label: "Release Z (ft)", placeholder: "5.5" },
  { key: "fb_velo", label: "Fastball Velo (mph)", placeholder: "94" },
  { key: "fb_ivb", label: "Fastball IVB (in)", placeholder: "18" },
  { key: "fb_hmov", label: "Fastball Horizontal Break (in)", placeholder: "-7" },
];

export default function TryModelPage() {
  const [pitchType, setPitchType] = useState("FF");
  const [handedness, setHandedness] = useState("R");
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(FIELDS.map((f) => [f.key, ""]))
  );
  const [result, setResult] = useState<{ stuffPlus: number; percentile: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const payload = {
      pitchType: pitchType.trim().toUpperCase(),
      handedness: handedness.trim().toUpperCase() === "L" ? "L" : "R",
      release_speed: parseFloat(values.release_speed) || 0,
      pfx_x: parseFloat(values.pfx_x) || 0,
      pfx_z: parseFloat(values.pfx_z) || 0,
      release_extension: parseFloat(values.release_extension) || 0,
      release_spin_rate: parseFloat(values.release_spin_rate) || 0,
      spin_axis: parseFloat(values.spin_axis) || 0,
      release_pos_x: parseFloat(values.release_pos_x) || 0,
      release_pos_z: parseFloat(values.release_pos_z) || 0,
      fb_velo: parseFloat(values.fb_velo) || 0,
      fb_ivb: parseFloat(values.fb_ivb) || 0,
      fb_hmov: parseFloat(values.fb_hmov) || 0,
    };

    try {
      const res = await fetch("/api/stuff-plus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Prediction failed");
      }

      setResult({ stuffPlus: data.stuffPlus, percentile: data.percentile });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />

      <section className="pt-40 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#ffd000] text-sm tracking-[0.4em] uppercase mb-4">Try It</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">STUFF+ MODEL</h1>
            <p className="text-white/70 mb-12">
              Enter pitch data below to get an instant Stuff+ rating. 100 is league average.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                  Pitch Type
                </label>
                <select
                  value={pitchType}
                  onChange={(e) => setPitchType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white focus:border-[#ffd000] focus:outline-none"
                >
                  {PITCH_TYPES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                  Handedness
                </label>
                <select
                  value={handedness}
                  onChange={(e) => setHandedness(e.target.value)}
                  className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white focus:border-[#ffd000] focus:outline-none"
                >
                  <option value="R">Right</option>
                  <option value="L">Left</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm uppercase tracking-wider text-white/70 mb-2">
                      {f.label}
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={values[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 bg-[#132238] border border-white/20 rounded text-white placeholder-white/40 focus:border-[#ffd000] focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-[#c41e3a] text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-[#c41e3a] text-white font-semibold tracking-wider uppercase hover:bg-[#9e1830] transition-colors disabled:opacity-50 rounded-sm"
              >
                {loading ? "Calculating..." : "Get Stuff+"}
              </button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 bg-[#132238] border border-[#ffd000]/30 rounded-lg text-center"
              >
                <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Your Result</p>
                <p className="font-display text-5xl text-[#ffd000] mb-2">{result.stuffPlus.toFixed(1)}</p>
                <p className="text-white/80">Stuff+ · {result.percentile.toFixed(1)}th percentile</p>
              </motion.div>
            )}

            <p className="mt-12 text-white/50 text-sm">
              Data from Trackman, Rapsodo, or similar devices. For the full experience, check out our{" "}
              <Link href="/products" className="text-[#ffd000] hover:underline">Stuff+ Analyzer App</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
