"use client";

import * as React from "react";
import Image from "next/image";
import {
  Users,
  CalendarDays,
  Store,
  ShieldCheck,
  BadgeCheck,
  ImageUp,
  EyeOff,
  Bell,
  Baby,
  HeartHandshake,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HeroSignup } from "@/components/hero-signup";
import { NotifyDialog } from "@/components/notify-dialog";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1735178391856-7c0ad49c63ee?q=80&w=1600&auto=format&fit=crop";

const FEATURES = [
  {
    icon: Users,
    title: "Find your people",
    body: "Verified single parents near you, matched by neighborhood and your kids' ages. Connections are mutual — nobody can message you until you both opt in.",
  },
  {
    icon: CalendarDays,
    title: "Meetups that fit your life",
    body: "Playdates, park mornings, and adults-only nights out. One-tap RSVP with a group chat built in — and adults-only events can pool a verified sitter.",
  },
  {
    icon: Store,
    title: "The parent marketplace",
    body: "Local family deals, background-checked sitters you can book in-app, and a Give & Get section for passing kids' gear to families nearby.",
  },
];

const SAFETY = [
  {
    icon: BadgeCheck,
    title: "Verified before they see you",
    body: "Every member completes ID verification and a background screen before they can view a single profile. Nobody browses Village anonymously.",
  },
  {
    icon: ImageUp,
    title: "Your photos, protected",
    body: "Share the moments you want — every upload is screened by automated moderation and stripped of hidden location data before anyone sees it.",
  },
  {
    icon: EyeOff,
    title: "No screenshots. Ever.",
    body: "Village blocks screenshots and screen recordings inside the app. What you share with your village stays in your village.",
  },
  {
    icon: Baby,
    title: "Kids' details stay private",
    body: "Profiles show kids' age ranges only — never names, birthdates, or schools. Your location appears as a neighborhood, never a pin on your house.",
  },
  {
    icon: ShieldCheck,
    title: "Background-checked sitters",
    body: "Every bookable sitter passes a professional background check — national criminal, sex-offender registry, and county records — before the badge appears.",
  },
  {
    icon: HeartHandshake,
    title: "Community, not dating",
    body: "Romantic advances are a reportable offense with swift bans. Reports involving children's safety route directly to priority human review.",
  },
];

const FAQS = [
  {
    q: "Is Village free?",
    a: "Yes. Finding parents, joining meetups, and messaging are free — and they'll stay that way. Down the road we may offer an optional premium tier, but the core community will never sit behind a paywall.",
  },
  {
    q: "Is this a dating app?",
    a: "No — and we enforce it. Village is community-first: friendships, playdates, and support. Romantic advances are a reportable offense that leads to removal.",
  },
  {
    q: "How does verification work?",
    a: "Before anyone can view profiles or send a message, they verify their identity with a government ID through a secure third-party service. Sitters additionally complete a professional background check.",
  },
  {
    q: "What happens to photos I upload?",
    a: "Your photos stay yours. Every image is automatically screened by moderation before going live, hidden GPS data is stripped on upload, and screenshots are blocked inside the app.",
  },
  {
    q: "When is Village coming to my city?",
    a: "We launch one metro at a time so every neighborhood has real density from day one. Join the list with your ZIP — it directly decides where we open next, and we'll notify you the moment Village is live in your area.",
  },
];

export default function Home() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => setDialogOpen(true);

  return (
    <main className="bg-white">
      <NotifyDialog open={dialogOpen} onOpenChange={setDialogOpen} autoOpen={false} />

      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-base font-black text-butter">
              ⌂
            </div>
            <span className="font-display text-xl font-semibold text-ink">
              Village
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-sub md:flex">
            <a href="#features" className="transition-colors hover:text-ink">
              Features
            </a>
            <a href="#safety" className="transition-colors hover:text-ink">
              Safety
            </a>
            <a href="#faq" className="transition-colors hover:text-ink">
              FAQ
            </a>
            <a
              href="/sitters"
              className="font-semibold text-pine transition-colors hover:text-ink"
            >
              Become a sitter
            </a>
          </nav>
          <Button variant="coral" size="sm" className="h-9 px-4" onClick={openDialog}>
            <Bell className="h-3.5 w-3.5" /> Get notified
          </Button>
        </div>
      </header>

      {/* hero */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              It takes a village.
              <br />
              <em className="italic text-pine">Find yours.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sub">
              The community app for single parents. Meet verified parents
              nearby, plan meetups that fit single-parent life, and book
              sitters who&apos;ve actually been background-checked.
            </p>
            <div className="mt-8">
              <HeroSignup />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-sub">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-pine" /> Every member verified
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-pine" /> Background-checked sitters
              </span>
              <span className="flex items-center gap-1.5">
                <EyeOff className="h-4 w-4 text-pine" /> Screenshots blocked
              </span>
            </div>
          </div>

          {/* photo with floating cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={HERO_PHOTO}
                alt="A mom hugging her young son"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* floating profile card */}
            <div className="absolute -bottom-6 -left-4 w-64 rounded-2xl border border-border bg-white p-4 shadow-lg sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    src={`${HERO_PHOTO.split("?")[0]}?q=80&w=200&auto=format&fit=crop`}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-ink">
                    Danielle R. <BadgeCheck className="h-3.5 w-3.5 text-pine" />
                  </div>
                  <div className="text-xs text-sub">
                    Single mom of 2 · Grant Park
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-pine-tint px-3 py-2">
                <span className="text-xs font-medium text-pine">
                  ID verified · 0.8 mi away
                </span>
                <span className="rounded-full bg-coral px-2.5 py-1 text-[11px] font-semibold text-white">
                  Connect
                </span>
              </div>
            </div>

            {/* floating rating chip */}
            <div className="absolute -top-4 right-4 flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 shadow-md">
              <Star className="h-4 w-4 fill-butter text-[#C79A2A]" />
              <span className="text-xs font-semibold text-ink">
                Trusted by parents like you
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border px-6 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["1 in 4", "US families are single-parent households"],
            ["96%", "of single parents say they feel isolated"],
            ["1", "community built to change that"],
          ].map(([n, l]) => (
            <div key={l} className="px-2 py-8 text-center sm:px-8">
              <div className="font-display text-4xl font-semibold text-pine">{n}</div>
              <div className="mt-1.5 text-sm text-sub">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pine">
            What you get
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Everything single-parent life needs, in one place
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border border-border shadow-none transition-shadow hover:shadow-md">
              <CardContent className="p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-pine-tint">
                  <Icon className="h-5 w-5 text-pine" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-ink">{title}</h3>
                <p className="text-[15px] leading-relaxed text-sub">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* safety */}
      <section id="safety" className="scroll-mt-20 bg-pine">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-butter">
              Trust &amp; safety
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white">
              Safety isn&apos;t a feature. It&apos;s the foundation.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#CFE0D8]">
              You can&apos;t even see profiles until you&apos;ve been verified.
              That&apos;s the whole point.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white/[0.06] p-6">
                <Icon className="mb-4 h-5 w-5 text-butter" />
                <h3 className="mb-1.5 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-[#CFE0D8]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pine">
            FAQ
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Questions, answered
          </h2>
        </div>
        <Accordion type="single" collapsible>
          {FAQS.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* final CTA */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Your village is waiting
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-sub">
            Be first in line when Village opens in your neighborhood.
          </p>
          <Button variant="coral" size="lg" className="mt-8" onClick={openDialog}>
            <Bell className="h-4 w-4" /> Get notified at launch
          </Button>
          <p className="mt-6 text-sm text-sub">
            Single mom who wants to help shape Village?{" "}
            <a href="/ambassadors" className="font-semibold text-pine underline-offset-2 hover:underline">
              Join the Founding Moms →
            </a>
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-base font-black text-butter">
                  ⌂
                </div>
                <span className="font-display text-xl font-semibold text-ink">
                  Village
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-sub">
                The community app for single parents. It takes a village — find
                yours.
              </p>
            </div>
            <div className="flex gap-16 text-sm">
              <div className="flex flex-col gap-2.5">
                <span className="font-semibold text-ink">Product</span>
                <a href="#features" className="text-sub hover:text-ink">Features</a>
                <a href="#safety" className="text-sub hover:text-ink">Safety</a>
                <a href="#faq" className="text-sub hover:text-ink">FAQ</a>
                <a href="/sitters" className="text-sub hover:text-ink">Become a sitter</a>
                <a href="/ambassadors" className="text-sub hover:text-ink">Founding Moms</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="font-semibold text-ink">Company</span>
                <span className="text-sub">Robinson Premier Group</span>
                <span className="flex items-center gap-1 text-sub">
                  <MapPin className="h-3.5 w-3.5" /> Atlanta, GA
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-sm text-sub">
            © {new Date().getFullYear()} Village. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
