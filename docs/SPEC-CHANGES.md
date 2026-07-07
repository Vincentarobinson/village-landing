# Spec changes vs. VILLAGE-BUILD-SPEC.md v1.0

Decisions made after the original spec was written. The source spec is
maintained outside this repo; fold these in on the next revision.

## 1. Profile photos are required — with neutral framing

The original spec said kids' photos are "never required." Updated policy:

- **Profile photos are required** (part of the trust model, alongside ID
  verification).
- The app has a general **photo upload feature** — profile, meetups,
  listings, chat. UI copy stays neutral ("Add photos"), never prompting
  for kids' photos specifically. People will naturally share their kids,
  pets, and themselves.
- All protections still apply to every upload: automated moderation
  before publish, EXIF/GPS stripping, screenshot & screen-recording
  blocking (e.g. `expo-screen-capture`), report-photo action.
- Kids' *data* stays minimal: age ranges only, no names/birthdates,
  neighborhood-level location.

## 2. App needs a "not launched in your area yet" screen

Because we launch metro-by-metro, verified users outside a live metro
need a dedicated screen instead of an empty feed:

- Message: not in your neighborhood *yet*; density-first launch strategy
  framed as a benefit.
- Social proof: count of nearby waiting parents (from waitlist zips).
- CTA: "Notify me" + secondary "Invite parents you know."
- Design mock lives at **/screens/not-in-your-area** in this repo.

## 3. Marketing copy

- Removed "Launching first in Atlanta" from the landing page — city
  names don't appear in hero marketing.
- Landing hero uses a real photo (Unsplash License, photo
  `lyX93rbcS-8`); swap for owned/licensed brand photography before major
  press.
