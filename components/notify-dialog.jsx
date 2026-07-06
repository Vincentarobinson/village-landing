"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartyPopper } from "lucide-react";

const AUTO_OPEN_DELAY_MS = 6000;

export function NotifyDialog({ open, onOpenChange, autoOpen = true }) {
  const [method, setMethod] = React.useState("email");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | done | error
  const [error, setError] = React.useState("");
  const autoOpened = React.useRef(false);

  // Auto-open once after a short delay (unless already opened/dismissed)
  React.useEffect(() => {
    if (!autoOpen || autoOpened.current) return;
    const t = setTimeout(() => {
      if (!autoOpened.current) {
        autoOpened.current = true;
        onOpenChange(true);
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, [autoOpen, onOpenChange]);

  React.useEffect(() => {
    if (open) autoOpened.current = true;
  }, [open]);

  async function submit(e) {
    e.preventDefault();
    setError("");

    const contact = method === "email" ? email.trim() : phone.trim();
    if (!contact) {
      setError(method === "email" ? "Enter your email." : "Enter your phone number.");
      return;
    }
    if (method === "email" && !/^\S+@\S+\.\S+$/.test(contact)) {
      setError("That email doesn't look right.");
      return;
    }
    if (method === "phone" && contact.replace(/\D/g, "").length < 10) {
      setError("Enter a 10-digit phone number.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, contact, zip: zip.trim() || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {status === "done" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pine-tint">
              <PartyPopper className="h-8 w-8 text-pine" />
            </div>
            <DialogTitle className="mb-2">You&apos;re on the list!</DialogTitle>
            <DialogDescription>
              We&apos;ll {method === "email" ? "email" : "text"} you the moment
              Village launches in your area.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Be first in the Village</DialogTitle>
              <DialogDescription>
                Get notified the moment the app launches. Atlanta first —
                your zip helps us pick the next city.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
              <Tabs value={method} onValueChange={setMethod}>
                <TabsList>
                  <TabsTrigger value="email">Email me</TabsTrigger>
                  <TabsTrigger value="phone">Text me</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <div className="space-y-1.5">
                    <Label htmlFor="notify-email">Email address</Label>
                    <Input
                      id="notify-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone">
                  <div className="space-y-1.5">
                    <Label htmlFor="notify-phone">Phone number</Label>
                    <Input
                      id="notify-phone"
                      type="tel"
                      placeholder="(404) 555-0123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-1.5">
                <Label htmlFor="notify-zip">Zip code (optional)</Label>
                <Input
                  id="notify-zip"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="30312"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              {error && (
                <p className="rounded-xl bg-[#FDECEB] px-4 py-2.5 text-center text-sm font-bold text-[#B3392C]">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="coral"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Adding you…" : "Notify me at launch"}
              </Button>

              <p className="text-center text-xs font-semibold text-sub">
                One notification at launch. No spam, no sharing your info.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
