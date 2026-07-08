"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  CalendarClock,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const PERKS = [
  {
    icon: Wallet,
    title: "Set your own rate",
    body: "You choose your hourly rate and service area. Village takes nothing from your earnings in the early program.",
  },
  {
    icon: BadgeCheck,
    title: "Stand out with the badge",
    body: "Pass a professional background check and carry the verified badge parents actually trust.",
  },
  {
    icon: CalendarClock,
    title: "First in line at launch",
    body: "Early applicants are the first sitters parents see when Village opens in their neighborhood.",
  },
];

export default function SittersPage() {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    zip: "",
    yearsExperience: "",
    hourlyRate: "",
    about: "",
    consents: false,
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.fullName.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return setError("Please enter a valid email.");
    if (!form.consents)
      return setError(
        "Village sitters must consent to a background check to apply."
      );
    setStatus("sending");
    try {
      const res = await fetch("/api/sitter-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          zip: form.zip.trim(),
          yearsExperience: form.yearsExperience
            ? parseInt(form.yearsExperience, 10)
            : null,
          hourlyRate: form.hourlyRate.trim(),
          about: form.about.trim(),
          consents: form.consents,
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
            For parents →
          </Link>
        </div>
      </header>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
          {/* left: pitch */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pine">
              For sitters
            </p>
            <h1 className="font-display text-[40px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Sit for families who
              <br />
              <em className="italic text-pine">actually know you</em>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-sub">
              Village connects background-checked sitters with single parents
              in their own neighborhood. Apply early and be first on the list
              when we open near you.
            </p>

            <div className="mt-10 space-y-5">
              {PERKS.map(({ icon: Icon, title, body }) => (
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

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
              <p className="text-sm leading-relaxed text-sub">
                <span className="font-semibold text-ink">
                  About the background check:
                </span>{" "}
                verification is handled by a professional screening service
                (national criminal, sex-offender registry, county records).
                Sitters cover the one-time screening fee — that&apos;s what
                makes the badge mean something.
              </p>
            </div>
          </div>

          {/* right: application form */}
          <Card className="h-fit border border-border shadow-lg">
            <CardContent className="p-8">
              {status === "done" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pine-tint">
                    <CheckCircle2 className="h-8 w-8 text-pine" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Application received
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-sub">
                    We&apos;ll reach out with next steps — including your
                    background check — as your neighborhood gets close to
                    launch.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Apply as an early sitter
                  </h2>
                  <p className="mt-2 text-sm text-sub">
                    Takes two minutes. No fee until your background check.
                  </p>

                  <form onSubmit={submit} className="mt-7 space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="s-name">Full name</Label>
                      <Input
                        id="s-name"
                        value={form.fullName}
                        onChange={set("fullName")}
                        autoComplete="name"
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="s-email">Email</Label>
                        <Input
                          id="s-email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="s-phone">Phone (optional)</Label>
                        <Input
                          id="s-phone"
                          type="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="s-zip">ZIP</Label>
                        <Input
                          id="s-zip"
                          inputMode="numeric"
                          maxLength={5}
                          value={form.zip}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              zip: e.target.value.replace(/\D/g, ""),
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="s-exp">Years exp.</Label>
                        <Input
                          id="s-exp"
                          inputMode="numeric"
                          maxLength={2}
                          value={form.yearsExperience}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              yearsExperience: e.target.value.replace(/\D/g, ""),
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="s-rate">Rate ($/hr)</Label>
                        <Input
                          id="s-rate"
                          value={form.hourlyRate}
                          onChange={set("hourlyRate")}
                          placeholder="18"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-about">
                        Tell parents about yourself (optional)
                      </Label>
                      <textarea
                        id="s-about"
                        rows={3}
                        value={form.about}
                        onChange={set("about")}
                        className="flex w-full rounded-2xl border-[1.5px] border-input bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-sub/70 focus-visible:outline-none focus-visible:border-pine"
                        placeholder="CPR certified, 4 years with toddlers…"
                      />
                    </div>

                    <label className="flex items-start gap-3 rounded-xl bg-pine-tint/60 p-3.5 text-sm leading-relaxed text-sub">
                      <input
                        type="checkbox"
                        checked={form.consents}
                        onChange={set("consents")}
                        className="mt-0.5 h-4 w-4 accent-[#1E4D42]"
                      />
                      <span>
                        I understand Village sitters complete a professional
                        background check before going live, and that sitters
                        cover the one-time screening fee.
                      </span>
                    </label>

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
                      {status === "sending" ? "Submitting…" : "Apply early"}
                    </Button>
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
