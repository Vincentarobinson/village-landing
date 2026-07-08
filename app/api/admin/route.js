import { NextResponse } from "next/server";

/*
 * POST /api/admin — dashboard data.
 * Requires:
 *   ADMIN_DASHBOARD_PASSWORD  you choose it (Vercel env var)
 *   SUPABASE_SERVICE_ROLE_KEY Supabase → Settings → API (server-only;
 *                             bypasses RLS so the dashboard can READ)
 */

async function sb(path) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "count=exact",
    },
    cache: "no-store",
  });
  const count = res.headers.get("content-range")?.split("/")[1];
  const data = await res.json().catch(() => []);
  return { data: Array.isArray(data) ? data : [], count: Number(count || 0) };
}

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (
    !process.env.ADMIN_DASHBOARD_PASSWORD ||
    password !== process.env.ADMIN_DASHBOARD_PASSWORD
  ) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not set in Vercel yet." },
      { status: 500 }
    );
  }

  const [
    waitlist,
    bySource,
    byZip,
    sitters,
    ambassadors,
    profiles,
    meetups,
    messages,
    connections,
  ] = await Promise.all([
    sb("launch_notifications?select=method,contact,zip,source,created_at&order=created_at.desc&limit=25"),
    sb("signups_by_source?select=*"),
    sb("signup_density?select=*&limit=15"),
    sb("sitter_applications?select=full_name,email,zip,hourly_rate,created_at&order=created_at.desc&limit=25"),
    sb("ambassador_applications?select=full_name,email,neighborhood,groups_communities,created_at&order=created_at.desc&limit=25"),
    sb("profiles?select=display_name,parent_type,neighborhood,onboarded_at&order=onboarded_at.desc&limit=25"),
    sb("meetups?select=title,when_text,place_name,created_at&order=created_at.desc&limit=10"),
    sb("messages?select=id&limit=1"),
    sb("connections?select=id&limit=1"),
  ]);

  return NextResponse.json({
    totals: {
      waitlist: waitlist.count,
      sitters: sitters.count,
      ambassadors: ambassadors.count,
      appUsers: profiles.count,
      meetups: meetups.count,
      messages: messages.count,
      connections: connections.count,
    },
    bySource: bySource.data,
    byZip: byZip.data,
    recent: {
      waitlist: waitlist.data,
      sitters: sitters.data,
      ambassadors: ambassadors.data,
      profiles: profiles.data,
      meetups: meetups.data,
    },
  });
}
