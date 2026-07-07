"use client";

/*
 * APP SCREEN MOCK — "Not in your area yet"
 * ----------------------------------------
 * This is a design reference for the mobile app (not part of the
 * marketing site). Shown when a verified user opens Village in a
 * metro we haven't launched yet. Reachable at /screens/not-in-your-area
 * for review. See docs/SPEC-CHANGES.md.
 */

import * as React from "react";
import { MapPin, Bell, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotInYourAreaScreen() {
  const [notified, setNotified] = React.useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#141B19] p-6">
      <div className="w-full max-w-[380px]">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-white/40">
          App screen mock · Not in your area yet
        </p>

        {/* phone frame */}
        <div className="overflow-hidden rounded-[44px] border-8 border-[#0B0F0E] bg-cream shadow-2xl">
          {/* status bar */}
          <div className="flex justify-between px-7 pb-1 pt-4 text-[12px] font-semibold text-ink">
            <span>9:41</span>
            <span className="tracking-[2px]">▮▮▮</span>
          </div>

          <div className="flex flex-col px-6 pb-10 pt-8">
            {/* brand */}
            <div className="mx-auto flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-base font-black text-butter">
                ⌂
              </div>
              <span className="font-display text-xl font-semibold text-ink">
                Village
              </span>
            </div>

            {/* map-pin visual */}
            <div className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-pine-tint">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pine">
                <MapPin className="h-8 w-8 text-butter" />
              </div>
            </div>

            {/* copy */}
            <h1 className="mt-8 text-center font-display text-[26px] font-semibold leading-tight text-ink">
              We&apos;re not in your
              <br />
              neighborhood yet
            </h1>
            <p className="mt-3 text-center text-[15px] leading-relaxed text-sub">
              Village opens one community at a time, so every neighborhood has
              real families from day one. Yours is on the map — we&apos;ll let
              you know the moment it&apos;s ready.
            </p>

            {/* neighbors counter */}
            <div className="mt-7 flex items-center justify-center gap-2 rounded-2xl border border-[#E3DCCF] bg-white px-4 py-3.5">
              <Users className="h-4 w-4 text-pine" />
              <span className="text-sm font-medium text-ink">
                23 parents near you are waiting too
              </span>
            </div>

            {/* CTA */}
            {notified ? (
              <div className="mt-4 rounded-2xl bg-pine-tint px-4 py-3.5 text-center text-sm font-semibold text-pine">
                You&apos;re on the list — we&apos;ll notify you first.
              </div>
            ) : (
              <Button
                variant="coral"
                size="lg"
                className="mt-4 w-full"
                onClick={() => setNotified(true)}
              >
                <Bell className="h-4 w-4" /> Notify me when it&apos;s my turn
              </Button>
            )}

            <button className="mx-auto mt-4 flex items-center gap-1 text-sm font-medium text-sub transition-colors hover:text-ink">
              Invite parents you know <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
