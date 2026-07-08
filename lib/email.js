/*
 * Resend integration — welcome emails + audience sync.
 *
 * Env vars (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY            required to send anything
 *   RESEND_FROM               e.g. "Vincent from Village <vincent@joinvillage.app>"
 *                             (falls back to onboarding@resend.dev, which can
 *                             only deliver to your own inbox until a domain
 *                             is verified in Resend)
 *   RESEND_AUDIENCE_PARENTS   optional Resend audience IDs — contacts get
 *   RESEND_AUDIENCE_SITTERS   added so you can send Broadcasts (E2–E7 of
 *   RESEND_AUDIENCE_MOMS      the email plan) from the Resend dashboard
 *
 * All calls are best-effort: a failed email never breaks a signup.
 */

const API = "https://api.resend.com";
const SITE = "https://village-landing-five.vercel.app";

function key() {
  return process.env.RESEND_API_KEY || null;
}

function from() {
  return process.env.RESEND_FROM || "Village <onboarding@resend.dev>";
}

async function post(path, body) {
  const k = key();
  if (!k) return; // not configured yet — no-op
  try {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${k}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`[resend] ${path} failed:`, res.status, await res.text());
    }
  } catch (e) {
    console.error(`[resend] ${path} error:`, e.message);
  }
}

export async function addToAudience(audienceEnv, email, firstName) {
  const audienceId = process.env[audienceEnv];
  if (!audienceId) return;
  await post(`/audiences/${audienceId}/contacts`, {
    email,
    first_name: firstName || undefined,
    unsubscribed: false,
  });
}

function shell(inner) {
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#22333B;line-height:1.6;font-size:15px">
  <div style="margin-bottom:20px"><span style="display:inline-block;background:#1E4D42;color:#FFD98E;border-radius:8px;padding:4px 9px;font-weight:800">⌂</span> <strong style="font-size:18px">Village</strong></div>
  ${inner}
  <p style="color:#6B7A76;font-size:12px;margin-top:28px">Village · Atlanta, GA · It takes a village. Find yours.<br/>You signed up at ${SITE.replace("https://", "")} — reply to this email anytime.</p>
</div>`;
}

/* E1 — parent waitlist welcome (village-email-sequence.md) */
export async function sendParentWelcome(email) {
  await post("/emails", {
    from: from(),
    to: [email],
    subject: "You're in. Here's what Village actually is",
    html: shell(`
      <p>Hey — Vincent here, single dad over in Grant Park and the person building Village.</p>
      <p>You just joined the waitlist, so here's the honest pitch: Village is a <strong>free app for single parents</strong> to find each other nearby — everyone ID-verified before they can see a single profile, playdates and park meetups that actually happen, and background-checked sitters. It is <strong>not a dating app</strong>. It never will be.</p>
      <p>Village opens neighborhood-by-neighborhood, and <strong>your ZIP literally decides where we launch</strong>. The fastest way to get Village where you live:</p>
      <p><a href="${SITE}?utm_source=email&utm_medium=referral&utm_campaign=e1" style="background:#FF6B5B;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block">Send this link to one single parent you know →</a></p>
      <p>That's it. I'll email you every couple weeks with real progress — no spam, and you can leave anytime.</p>
      <p>— Vincent</p>
      <p style="color:#6B7A76;font-size:13px">P.S. Single mom who wants to help shape this? A small group of <a href="${SITE}/ambassadors?utm_source=email&utm_medium=welcome&utm_campaign=e1">Founding Moms</a> gets lifetime premium and a real say.</p>
    `),
  });
}

/* S1 — sitter application welcome */
export async function sendSitterWelcome(email, firstName) {
  await post("/emails", {
    from: from(),
    to: [email],
    subject: "Got your application — here's what happens next",
    html: shell(`
      <p>${firstName ? `Hi ${firstName} — thanks` : "Thanks"} for applying to sit for Village.</p>
      <p><strong>What happens next:</strong> as your area approaches launch, we'll send your background-check invite (one-time fee, covered by you — it's what makes the Village badge actually mean something to parents). Pass it and you're listed from day one, at your rate, for verified parents nearby.</p>
      <p>Two things that help meanwhile: reply with your availability and any certifications (CPR etc.), and if you know other great sitters, send them here — early applicants get seen first:</p>
      <p><a href="${SITE}/sitters?utm_source=email&utm_medium=referral&utm_campaign=s1" style="color:#1E4D42;font-weight:700">${SITE.replace("https://", "")}/sitters</a></p>
      <p>— Vincent</p>
    `),
  });
}

/* Founding Mom application welcome */
export async function sendAmbassadorWelcome(email, firstName) {
  await post("/emails", {
    from: from(),
    to: [email],
    subject: "Read your application — let's talk",
    html: shell(`
      <p>${firstName ? `${firstName} — thank` : "Thank"} you. I read every Founding Mom application myself, and I'd love 15 minutes to hear what you'd fix about how single parents find community — and to tell you where Village is headed. <strong>Just reply with a couple of time windows that work.</strong></p>
      <p>One thing I want to say up front: this only works if it's honest. Founding Moms always say they're Founding Moms when they share Village — you'll never be asked to pretend you stumbled onto it.</p>
      <p>What you get: lifetime premium, the Founding Mom badge, your neighborhood prioritized, and a real vote on what gets built — especially safety.</p>
      <p>— Vincent</p>
    `),
  });
}
