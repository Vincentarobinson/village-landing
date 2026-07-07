"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

/* Inline hero capture — Care.com-style zip + email bar. */
export function HeroSignup() {
  const [email, setEmail] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "email",
          contact: email.trim(),
          zip: zip.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong — try again.");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-pine/20 bg-pine-tint px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-pine" />
        <p className="text-sm font-semibold text-pine">
          You&apos;re on the list — we&apos;ll email you the moment Village
          opens near you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-xl">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-13 bg-white sm:flex-1"
          aria-label="Email address"
        />
        <Input
          inputMode="numeric"
          maxLength={5}
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="h-13 bg-white sm:w-28"
          aria-label="ZIP code"
        />
        <Button
          type="submit"
          variant="coral"
          size="lg"
          disabled={status === "sending"}
          className="h-13"
        >
          {status === "sending" ? "Joining…" : "Get early access"}
        </Button>
      </div>
      {error ? (
        <p className="mt-2.5 text-sm font-medium text-coral">{error}</p>
      ) : (
        <p className="mt-2.5 text-sm text-sub">
          Free to join. Prefer a text instead? Use the button in the top corner.
        </p>
      )}
    </form>
  );
}
