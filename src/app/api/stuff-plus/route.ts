import { NextRequest, NextResponse } from "next/server";

const STUFF_PLUS_API = process.env.STUFF_PLUS_API_URL ?? "https://trackman-scraper-production.up.railway.app";

/**
 * Conversions match bpc_portal/app.py (plot_pitcher_report, stuffplus_data, _calculate_pitch_stuff):
 * - pfx_x = (HorzBreak * -1) / 12   [inches → feet, sign flip]
 * - pfx_z = InducedVertBreak / 12   [inches → feet]
 * - release_pos_x = RelSide * -1    [feet, sign flip]
 * - release_pos_z = RelHeight       [feet, no change]
 * - fb_ivb = InducedVertBreak / 12 [inches → feet]
 * - fb_hmov = (HorzBreak * -1) / 12 [inches → feet, sign flip]
 */
function toNum(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Form sends: HorzBreak (pfx_x), InducedVertBreak (pfx_z, fb_ivb), RelSide (release_pos_x),
    // RelHeight (release_pos_z), HorzBreak (fb_hmov) — all in Trackman units (inches for movement, feet for release)
    const horzBreak = toNum(body.pfx_x ?? body.pfxX);
    const inducedVertBreak = toNum(body.pfx_z ?? body.pfxZ);
    const relSide = toNum(body.release_pos_x ?? body.releasePosX);
    const fbIvbInches = toNum(body.fb_ivb ?? body.fbIvb);
    const fbHorzBreak = toNum(body.fb_hmov ?? body.fbHmov);

    const payload = {
      pitch_type: String(body.pitchType ?? body.pitch_type ?? "FF").toUpperCase(),
      release_speed: toNum(body.release_speed ?? body.releaseSpeed),
      pfx_x: (horzBreak * -1) / 12,
      pfx_z: inducedVertBreak / 12,
      release_extension: toNum(body.release_extension ?? body.releaseExtension),
      release_spin_rate: toNum(body.release_spin_rate ?? body.releaseSpinRate),
      spin_axis: toNum(body.spin_axis ?? body.spinAxis),
      release_pos_x: relSide * -1,
      release_pos_z: toNum(body.release_pos_z ?? body.releasePosZ),
      p_throws: String(body.handedness ?? body.p_throws ?? "R").toUpperCase().startsWith("L") ? "L" : "R",
      fb_velo: toNum(body.fb_velo ?? body.fbVelo),
      fb_ivb: fbIvbInches / 12,
      fb_hmov: (fbHorzBreak * -1) / 12,
    };

    const response = await fetch(`${STUFF_PLUS_API}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errMsg = `Stuff+ API error: ${response.status}`;
      try {
        const errJson = await response.clone().json();
        errMsg = errJson.detail ?? errJson.error ?? errMsg;
      } catch {
        errMsg = await response.text() || errMsg;
      }
      throw new Error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
    }

    const data = await response.json();
    const stuffPlus = toNum(data.stuff_plus ?? data.stuffPlus);
    const stuffPlusRaw = toNum(data.stuff_plus_raw ?? data.stuffPlusRaw);
    const percentile = 50 * (1 + Math.tanh((stuffPlus - 100) / 14));

    return NextResponse.json({
      stuffPlus,
      percentile: Math.round(percentile * 10) / 10,
      stuff_plus_raw: stuffPlusRaw,
    });
  } catch (err) {
    console.error("Stuff+ API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Prediction failed" },
      { status: 500 }
    );
  }
}
