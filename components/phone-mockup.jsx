import {
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Camera,
  Heart,
  Calendar,
  Users,
  ShoppingBag,
  MessageCircle,
  User,
} from "lucide-react";
import { MomKidIllustration } from "./mom-kid-illustration";

/*
 * Static render of the Village app — a Discover profile for a
 * verified single mom, shown with her kid. Mirrors the design
 * system in village-app-prototype.jsx.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[320px] rounded-[44px] border-8 border-[#0B0F0E] bg-cream shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden">
      {/* status bar */}
      <div className="flex justify-between px-6 pt-3 pb-1 text-[12px] font-extrabold text-ink">
        <span>9:41</span>
        <span className="tracking-[2px]">▮▮▮</span>
      </div>

      {/* brand bar */}
      <div className="flex items-center gap-2 px-5 pb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pine text-sm font-black text-butter">
          ⌂
        </div>
        <span className="font-display text-lg font-semibold text-ink">
          Village
        </span>
      </div>

      {/* profile card */}
      <div className="px-4 pb-3">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="relative">
            <MomKidIllustration className="block h-auto w-full" />
            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-extrabold text-pine">
              <BadgeCheck className="h-3.5 w-3.5" /> ID verified
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[10.5px] font-extrabold text-white">
              <Camera className="h-3.5 w-3.5" /> Screenshots blocked
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[16px] font-extrabold text-ink">
                Danielle R.
              </span>
              <span className="text-[11.5px] font-bold text-sub">0.8 mi</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[12px] font-bold text-sub">
              <MapPin className="h-3 w-3 text-coral" />
              Single mom of 2 · Kids 4 &amp; 7 · Grant Park
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Weekend playdates", "Coffee walks"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-pine-tint px-2.5 py-1 text-[10.5px] font-bold text-pine"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] font-extrabold text-pine">
                <ShieldCheck className="h-3.5 w-3.5" /> Background checked
              </span>
              <button className="flex items-center gap-1 rounded-full bg-coral px-4 py-2 text-[12px] font-extrabold text-white">
                <Heart className="h-3.5 w-3.5" /> Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* meetup teaser */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pine-tint text-lg">
            🛝
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-extrabold text-ink">
              Saturday Park Playdate
            </div>
            <div className="text-[11px] font-bold text-sub">
              Grant Park · 8 going
            </div>
          </div>
          <span className="rounded-full bg-butter px-2.5 py-1 text-[10px] font-extrabold text-[#8A6510]">
            RSVP
          </span>
        </div>
      </div>

      {/* tab bar */}
      <div className="flex justify-around border-t-[1.5px] border-[#EFE9DD] bg-white px-2 pb-5 pt-2.5">
        {[
          { icon: Users, label: "Discover", active: true },
          { icon: Calendar, label: "Meetups" },
          { icon: ShoppingBag, label: "Market" },
          { icon: MessageCircle, label: "Messages" },
          { icon: User, label: "Me" },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} className="flex w-14 flex-col items-center gap-0.5">
            <Icon
              className="h-5 w-5"
              color={active ? "#FF6B5B" : "#A6B0AC"}
              strokeWidth={active ? 2.4 : 2}
            />
            <span
              className={`text-[9.5px] font-extrabold ${
                active ? "text-ink" : "text-[#A6B0AC]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
