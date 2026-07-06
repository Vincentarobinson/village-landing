"use client";

import * as React from "react";
import {
  Users,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  BadgeCheck,
  Camera,
  EyeOff,
  Bell,
  MapPin,
  Baby,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneMockup } from "@/components/phone-mockup";
import { NotifyDialog } from "@/components/notify-dialog";

const FEATURES = [
  {
    icon: Users,
    emoji: "🤝",
    title: "Discover parents near you",
    body: "Find verified single moms and dads in your neighborhood, filtered by distance and your kids' ages. Mutual-consent connections — nobody can message you until you both say yes.",
  },
  {
    icon: Calendar,
    emoji: "🛝",
    title: "Meetups that actually happen",
    body: "Playdates, park hangs, and adults-only nights out. RSVP in one tap, group chat auto-created. Adults-only events can pool a verified sitter so everyone gets to show up.",
  },
  {
    icon: ShoppingBag,
    emoji: "🎟️",
    title: "A marketplace built for parents",
    body: "Exclusive local family deals, background-checked sitters bookable in-app, and a Give & Get section to pass kids' gear to families nearby.",
  },
];

const SAFETY = [
  {
    icon: BadgeCheck,
    title: "Verification before you see anyone",
    body: "Every member completes ID verification and a background check before they can view a single profile. No exceptions, no browsing anonymously.",
  },
  {
    icon: Camera,
    title: "Real photos, protected",
    body: "Profile photos are required — you always know who you're talking to. Every upload is scanned by automated moderation and stripped of hidden location data before it goes live.",
  },
  {
    icon: EyeOff,
    title: "Screenshots & screen recording banned",
    body: "The app blocks screenshots and screen recordings. What's shared in your village stays in your village — especially anything involving your kids.",
  },
  {
    icon: Baby,
    title: "Kids' privacy by design",
    body: "We show kids' age ranges only — never names, birthdates, or exact addresses. Your location appears as a neighborhood, never a pin on your house.",
  },
  {
    icon: ShieldCheck,
    title: "Background-checked sitters",
    body: "Every bookable sitter passes a professional background check (national criminal, sex offender registry, county records) before the verified badge appears.",
  },
  {
    icon: Heart,
    title: "Not a dating app. Period.",
    body: "Village is community-first. Romantic advances are a reportable offense with swift bans. Reports involving children's safety go straight to priority human review.",
  },
];

export default function Home() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => setDialogOpen(true);

  return (
    <main>
      <NotifyDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pine text-lg font-black text-butter">
            ⌂
          </div>
          <span className="font-display text-2xl font-semibold text-ink">
            Village
          </span>
        </div>
        <Button variant="coral" onClick={openDialog}>
          <Bell className="h-4 w-4" /> Get notified
        </Button>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-2">
        <div>
          <Badge variant="butter" className="mb-5">
            <MapPin className="h-3.5 w-3.5" /> Launching first in Atlanta
          </Badge>
          <h1 className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl">
            It takes a village.
            <br />
            <em className="italic text-pine">Find yours.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg font-bold text-sub">
            Village is the community app for single parents — real connections
            with verified parents nearby, meetups that fit single-parent life,
            and local deals that make raising kids a little easier.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="coral" size="lg" onClick={openDialog}>
              <Bell className="h-4 w-4" /> Notify me at launch
            </Button>
            <span className="text-sm font-bold text-sub">
              Free to join · Email or text — your choice
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Badge>
              <BadgeCheck className="h-3.5 w-3.5" /> Every member verified
            </Badge>
            <Badge>
              <ShieldCheck className="h-3.5 w-3.5" /> Background checks
            </Badge>
            <Badge>
              <EyeOff className="h-3.5 w-3.5" /> Screenshots blocked
            </Badge>
          </div>
        </div>

        <PhoneMockup />
      </section>

      {/* stats strip */}
      <section className="border-y-[1.5px] border-[#E3DCCF] bg-white/60">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 text-center sm:grid-cols-3">
          {[
            ["1 in 4", "US families are single-parent households"],
            ["96%", "of single parents report feeling isolated"],
            ["0", "dating features — this is community, full stop"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-semibold text-pine">
                {n}
              </div>
              <div className="mt-1 text-sm font-bold text-sub">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Everything single-parent life needs, in one app
          </h2>
          <p className="mt-3 font-bold text-sub">
            Three things no other app puts together.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardContent className="p-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pine-tint text-3xl">
                  {f.emoji}
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-ink">
                  {f.title}
                </h3>
                <p className="text-[15px] font-semibold text-sub">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* safety */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[32px] bg-pine px-8 py-14 sm:px-12">
          <div className="mb-10 text-center">
            <Badge variant="butter" className="mb-4">
              <ShieldCheck className="h-3.5 w-3.5" /> Safety isn&apos;t a
              feature. It&apos;s the foundation.
            </Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white">
              Built safe for you — and your kids
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-bold text-[#CFE0D8]">
              You can&apos;t even see profiles until you&apos;ve been verified.
              That&apos;s the whole point.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl bg-white/[0.07] p-6 backdrop-blur"
              >
                <Icon className="mb-3 h-6 w-6 text-butter" />
                <h3 className="mb-1.5 font-extrabold text-white">{title}</h3>
                <p className="text-sm font-semibold text-[#CFE0D8]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Your village is waiting
        </h2>
        <p className="mx-auto mt-3 max-w-md font-bold text-sub">
          Be the first to know when Village opens in your neighborhood.
        </p>
        <Button variant="coral" size="lg" className="mt-7" onClick={openDialog}>
          <Bell className="h-4 w-4" /> Notify me at launch
        </Button>
      </section>

      {/* footer */}
      <footer className="border-t-[1.5px] border-[#E3DCCF]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm font-bold text-sub">
          <span>© {new Date().getFullYear()} Village · Robinson Premier Group</span>
          <span>It takes a village. Find yours.</span>
        </div>
      </footer>
    </main>
  );
}
