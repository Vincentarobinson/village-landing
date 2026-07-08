"use client";

import * as React from "react";
import Link from "next/link";
import {
  Crown,
  Megaphone,
  CalendarHeart,
  MessageSquareHeart,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const GIVES = [
  {
    icon: Megaphone,
    title: "Share it your way",
    body: "Post about Village in your own words, in the groups you're already part of — always openly, as a founding mom. Once or twice a month is plenty.",
  },
  {
    icon: CalendarHeart,
    title: "Co-host a meetup",
    body: "Help host one of the first Village meetups in your neighborhood — you pick the park, we handle the rest.",
  },
  {
    icon: MessageSquareHeart,
    title: "Tell us the truth",
    body: "Blunt feedback on every feature before it ships. Founding Moms shape what Village becomes — especially safety.",
  },
];

const GETS = [
  "Founding Mom badge on your profile, forever",
  "Lifetime premium — free, always",
  "Your neighborhood moved up the launch list",
  "Direct line to the founder + real say on the roadmap",
  "Co-host billing at Village events",
];

export default function AmbassadorsPage() {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    neighborhood: "",
    zip: "",
    groups: "",
    why: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.fullName.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return setError("Please enter a valid email.");
    setStatus("sending");
    try {
      const res = await fetch("/api/ambassador-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          neighborhood: form.neighborhood.trim(),
          zip: form.zip.trim(),
          groups: form.groups.trim(),
          why: form.why.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong — try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  return (
    <main className="bg-white">
      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-base font-black text-butter">
              ⌂
            </div>
            <span className="font-display text-xl font-semibold text-ink">
              Village
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-sub transition-colors hover:text-ink"
          >
            Back to Village →
          </Link>
        </div>
      </header>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
          {/* left: pitch */}
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-pine">
              <Sparkles className="h-4 w-4" /> Founding Moms
            </p>
            <h1 className="font-display text-[40px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Help build the village
              <br />
              <em className="italic text-pine">you wish existed</em>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-sub">
              Village is being built with single moms, not just for them.
              We&apos;re inviting a small founding group in Atlanta to shape
              the app, spread the word in their own voice, and host the first
              meetups.
            </p>

            <div className="mt-10 space-y-5">
              {GIVES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pine-tint">
                    <Icon className="h-5 w-5 text-pine" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-sub">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5 text-pine" />
                <h3 className="font-semibold text-ink">What Founding Moms get</h3>
              </div>
              <ul className="space-y-2">
                {GETS.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-sub">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right: application */}
          <Card className="h-fit border border-border shadow-lg">
            <CardContent className="p-8">
              {status === "done" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pine-tint">
                    <CheckCircle2 className="h-8 w-8 text-pine" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Thank you!
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-sub">
                    Vincent reads every application personally — you&apos;ll
                    hear back within a few days.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Apply to be a Founding Mom
                  </h2>
                  <p className="mt-2 text-sm text-sub">
                    We&apos;re starting with a small group in Atlanta.
                  </p>

                  <form onSubmit={submit} className="mt-7 space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="a-name">Name</Label>
                      <Input id="a-name" value={form.fullName} onChange={set("fullName")} autoComplete="name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-email">Email</Label>
                      <Input id="a-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="a-hood">Neighborhood</Label>
                        <Input id="a-hood" value={form.neighborhood} onChange={set("neighborhood")} placeholder="Grant Park" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="a-zip">ZIP</Label>
                        <Input
                          id="a-zip"
                          inputMode="numeric"
                          maxLength={5}
                          value={form.zip}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, zip: e.target.value.replace(/\D/g, "") }))
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-groups">
                        Groups or communities you&apos;re part of (optional)
                      </Label>
                      <Input
                        id="a-groups"
                        value={form.groups}
                        onChange={set("groups")}
                        placeholder="FB groups, school communities, church, etc."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-why">Why does Village matter to you?</Label>
                      <textarea
                        id="a-why"
                        rows={3}
                        value={form.why}
                        onChange={set("why")}
                        className="flex w-full rounded-2xl border-[1.5px] border-input bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-sub/70 focus-visible:outline-none focus-visible:border-pine"
                        placeholder="A sentence or two is perfect"
                      />
                    </div>

                    {error && (
                      <p className="text-sm font-medium text-danger">{error}</p>
                    )}

                    <Button
                      type="submit"
                      variant="coral"
                      size="lg"
                      className="w-full"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Apply"}
                    </Button>
                    <p className="text-center text-xs text-sub">
                      Founding Moms always disclose their role when sharing
                      Village — honesty is the whole brand.
                    </p>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
