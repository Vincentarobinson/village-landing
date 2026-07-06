import { NextResponse } from "next/server";

/*
 * POST /api/notify
 * Body: { method: "email" | "phone", contact: string, zip?: string }
 *
 * Inserts into the Supabase `launch_notifications` table (see
 * supabase/schema.sql) via the REST API — no client library needed.
 * If Supabase env vars are missing (local dev), logs and succeeds
 * so the UI can be tested without a backend.
 */

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const method = body.method === "phone" ? "phone" : "email";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const zip =
    typeof body.zip === "string" && /^\d{5}$/.test(body.zip.trim())
      ? body.zip.trim()
      : null;

  if (!contact) {
    return NextResponse.json({ error: "Contact is required." }, { status: 400 });
  }
  if (method === "email" && !EMAIL_RE.test(contact)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (method === "phone") {
    const digits = contact.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("[notify] (no Supabase configured)", { method, contact, zip });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/launch_notifications`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify({ method, contact, zip }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[notify] Supabase insert failed:", res.status, detail);
    return NextResponse.json(
      { error: "Couldn't save that right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
