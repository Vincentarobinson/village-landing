import { NextResponse } from "next/server";
import { sendSitterWelcome, addToAudience } from "@/lib/email";

/*
 * POST /api/sitter-apply
 * Early sitter applications from the website. Inserts into
 * `sitter_applications` (anon key, insert-only RLS).
 */

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fullName = (body.fullName || "").toString().trim().slice(0, 120);
  const email = (body.email || "").toString().trim().slice(0, 200);
  const phone = (body.phone || "").toString().trim().slice(0, 40) || null;
  const zip = /^\d{5}$/.test((body.zip || "").toString().trim())
    ? body.zip.toString().trim()
    : null;
  const yearsExperience = Number.isInteger(body.yearsExperience)
    ? Math.min(Math.max(body.yearsExperience, 0), 60)
    : null;
  const hourlyRate = (body.hourlyRate || "").toString().trim().slice(0, 20) || null;
  const about = (body.about || "").toString().trim().slice(0, 2000) || null;
  const consents = body.consents === true;

  if (!fullName) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!consents) {
    return NextResponse.json(
      { error: "Background-check consent is required to apply." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("[sitter-apply] (no Supabase configured)", { fullName, email });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/sitter_applications`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      phone,
      zip,
      years_experience: yearsExperience,
      hourly_rate: hourlyRate,
      about,
      consents_to_background_check: consents,
    }),
  });

  if (res.status === 409) {
    return NextResponse.json({ ok: true }); // already applied
  }

  if (res.ok) {
    const firstName = fullName.split(" ")[0];
    await Promise.all([
      sendSitterWelcome(email, firstName),
      addToAudience("RESEND_AUDIENCE_SITTERS", email, firstName),
    ]);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[sitter-apply] insert failed:", res.status, detail);
    return NextResponse.json(
      { error: "Couldn't save your application right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
