import { NextResponse } from "next/server";
import { sendAmbassadorWelcome, addToAudience } from "@/lib/email";

/* POST /api/ambassador-apply — Founding Moms program applications. */

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
  const neighborhood = (body.neighborhood || "").toString().trim().slice(0, 120) || null;
  const zip = /^\d{5}$/.test((body.zip || "").toString().trim())
    ? body.zip.toString().trim()
    : null;
  const groups = (body.groups || "").toString().trim().slice(0, 1000) || null;
  const why = (body.why || "").toString().trim().slice(0, 2000) || null;

  if (!fullName) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("[ambassador-apply] (no Supabase configured)", { fullName, email });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/ambassador_applications`, {
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
      neighborhood,
      zip,
      groups_communities: groups,
      why,
    }),
  });

  if (res.status === 409) return NextResponse.json({ ok: true });

  if (res.ok) {
    const firstName = fullName.split(" ")[0];
    await Promise.all([
      sendAmbassadorWelcome(email, firstName),
      addToAudience("RESEND_AUDIENCE_MOMS", email, firstName),
    ]);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[ambassador-apply] insert failed:", res.status, detail);
    return NextResponse.json(
      { error: "Couldn't save that right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
