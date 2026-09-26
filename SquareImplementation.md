> **SUPERSEDED — 2026-09-15.** The owner decided against online booking. All Square
> Appointments markup has been removed from the site and every CTA now dials
> (412) 450-0880. This document is kept only as a record of the work, in case the
> decision is ever revisited. **Do not implement anything below without checking first.**

# Square Appointments — Implementation Plan for Golden Triangle Massage

## Context

The site (`index.html`, `services.html`, `about.html`, `contact.html`) currently ships a **styled placeholder** for booking: every "Book Your Session" / "Book Now" gold button points to `#book`, and the `#book` band on `index.html` says "Online booking opens soon." The client will be taking payments through **Square**, so we're standardizing on **Square Appointments** for scheduling — one system for the calendar *and* the money, no second vendor.

Decisions locked in with the owner:
- **Integration style:** Square's **embedded booking widget** rendered inline inside our own black-and-gold page — the customer never visibly leaves the site.
- **Two booking channels:** (1) customers self-serve online and **pay through Square** at booking; (2) the owner can **manually enter** an appointment from the Square dashboard when someone phones in (confirmed: Square supports this, same shared calendar, no double-booking).
- **Therapist selection:** customers can **pick a specific therapist** and also see an "Any available" option.
- **Core requirements:** online bookers see each therapist's real availability, pick a time slot within those constraints, and pay online.

The bulk of this work is **Square dashboard configuration** (done by the owner, in the browser — no code). The website code change is small: swap the placeholder band for Square's embed snippet and re-point the existing buttons. Square Appointments' **Free plan** covers a single-location practice; Square only takes the standard per-transaction processing fee.

---

## Part A — Square dashboard setup (business owner, no code)

Do these in order at `squareup.com` → Dashboard → **Appointments**. This produces the data the website widget will display.

1. **Create / confirm the Square account** for the business (the same account that will receive payouts). Verify bank account for deposits and complete identity verification so payments can settle.
2. **Enable Appointments** and choose the **Free** plan. Set the single **location** = 320 Fort Duquesne Blvd, Pittsburgh PA 15222, and the business time zone (Eastern).
3. **Set business hours** for the location (Mon–Sat, by appointment). This bounds every therapist's bookable window.
4. **Add each therapist as a Team Member / Staff.** For every therapist set their **individual working hours** (the per-day availability customers will see). This is what satisfies "see when each masseuse is available."
5. **Create the services** — all seven are 50 minutes. Status as of 2026-08-25 (verified against the
   live booking flow):

   | Service | Duration | Regular | + Aromatherapy | In Square? |
   |---|---|---|---|---|
   | Swedish | 50 min | $110 | $125 | ✅ |
   | Prenatal (Pregnancy) | 50 min | $110 | $125 | ✅ |
   | Deep Tissue | 50 min | $125 | $140 | ✅ |
   | Trigger Point | 50 min | $125 | $140 | ✅ |
   | Hot Stone | 50 min | $125 | $140 | ✅ |
   | Himalayan Salt Stone | 50 min | $130 | *missing* | ⚠️ no aromatherapy option |
   | Cupping Therapy | 50 min | $125 | $140 | ❌ **not created yet** |

   **Outstanding:** create **Cupping Therapy** (50 min, Regular $125 / Aromatherapy $140), and add the
   missing **Aromatherapy variation to Himalayan Salt Stone** ($130 / $145) so it matches the others.

   Optionally add a buffer/cleanup time between appointments.

6. **Enhancements** — implemented two different (both valid) ways:
   - **Aromatherapy** is built as a **per-service variation**, not an add-on: each massage offers
     "Regular" and "Aromatherapy" options, the latter +$15. Adds no time. This is why the booking
     widget shows "Price varies" on those services — expected, not a bug.
   - **Scalp Massage** is a true **Add-on** category item, $10 (10 min) / $20 (20 min). ✅ Created.
     Its minutes must extend the booked slot so the calendar doesn't double-book the therapist.

7. **Assign services to staff** — check which therapists offer which services so the "pick a therapist" step only shows valid combinations. Prenatal in particular should only list therapists trained for it.
8. **Booking settings → let clients choose staff.** Turn on client staff selection *and* the "Any available" option. Set how far out and how soon before a slot customers may book (e.g., up to 60 days ahead, no later than 2 hours before).
9. **Payments / prepayment (the "pay online" requirement).** In Appointments payment settings, **require a card to book** and set prepayment. Recommend one of:
   - **Full prepayment** — charge the service price at booking (strongest no-show protection), or
   - **Deposit** — a fixed amount or % now, balance in person.
   Either way the online customer pays through Square at booking. For **phone bookings**, the owner chooses per-appointment: take the card over the phone, send a Square payment link, or mark pay-in-person.
10. **Cancellation / no-show policy** — set a cancellation window and optional fee; Square shows this to the customer at checkout.
11. **Notifications** — enable email + SMS **confirmations and reminders** to customers, and new-booking alerts to staff.
12. **Customer-facing polish** — upload the logo (`references/GTMLOGO2.png`), set the business name/address, and pick an accent color close to the site's gold so the embedded widget feels native.

---

## Part B — Website code integration ✅ DONE (2026-08-25)

The widget is live in `index.html`. Merchant confirmed as **Golden Triangle Massage LLC**
(`7wkaf66nn5cage` / location `LXZYDMAX96EXE`). All 15 booking CTAs across the four pages
already point at `#book`, so every one of them now lands on the working scheduler.

**Three things not to break when editing `index.html`:**
1. The embed `<script>` must stay **inside** `<div class="booking" id="book-widget">`. It replaces
   itself with an iframe at its own position; if its parent is `<head>` or `<html>` it
   redirects the entire page to Square instead of embedding.
2. Never add `defer`/`async` to it — it relies on `document.currentScript`.
3. Keep `.booking` free of side padding on small screens. Under **280px** of container width
   Square renders its own blue `#006aff` button instead of the widget. Current widths: 940px
   desktop, 345px at a 375px viewport.

**Testing note:** the widget does **not** render over `file://` — the iframe comes up blank.
Test on the deployed site or a local server (`python -m http.server`), not by double-clicking the file.


**What was built:**

- `index.html` — the `#book` band now holds `<div class="booking" id="book-widget">` containing the
  Square embed script, plus a `<noscript>` fallback linking to
  `https://app.squareup.com/appointments/book/7wkaf66nn5cage/LXZYDMAX96EXE/start`.
  The placeholder "booking opens soon" copy and the dead `#book-note` line are gone.
- `css/styles.css` — new `.booking` block. Square's script sets `min-height:500px` **inline** on the
  iframe, and inline styles beat stylesheet rules, so the taller height is applied with
  `!important` (820px desktop / 900px under 640px). Max-width 940px keeps the flow from
  stretching across the full container.
- The `.rise` scroll-reveal is deliberately **not** applied to the widget container, so a
  third-party iframe can never be left stuck at `opacity: 0`.

**Verified end-to-end in a real browser (Playwright, over HTTP):** widget loads the genuine Square
flow (`book.squareup.com`), page does **not** redirect, `allow="payment app.squareup.com"` is present
so Apple/Google Pay work, no horizontal overflow, and clicking a CTA on `services.html`,
`about.html`, and `contact.html` each lands on `index.html#book` with the widget loaded and the
heading clear of the fixed nav.

**Still shows "No services added yet"** until Part A steps 5–6 are completed in the Square dashboard.
That is a dashboard-configuration gap, not a website problem.

---

## Part C — Customer UI flow (what the online visitor experiences)

1. Lands on the site → clicks a gold **Book Your Session** button (any page).
2. Page scrolls to the `#book` section; the **Square widget loads inline**.
3. **Pick a service** (Swedish $110, Deep Tissue $125, etc.) — all 50 minutes, price shown. Optionally add an enhancement (aromatherapy, or a 10/20-min scalp massage).
4. **Pick a therapist** — a specific masseuse *or* "Any available."
5. **Pick a date & time** — the calendar shows only slots that fit that therapist's real availability, business hours, and existing bookings.
6. **Enter details** (name, email, phone) — new customers create a light profile; returning ones are recognized.
7. **Pay online** — enters card (Apple Pay / Google Pay supported); Square charges the full amount or deposit per the policy set in Part A step 9.
8. **Confirmation** on screen + **email/SMS**, with the cancellation policy and an add-to-calendar / reschedule link.
9. **Reminders** arrive automatically before the appointment.

---

## Part D — Business owner UI flow (what the owner does day to day)

- **See everything in one calendar** — Square Appointments Dashboard (web) or the Square Appointments **mobile app**. Online bookings and phone bookings appear together, color-coded by staff.
- **Phone booking (manual entry):** owner clicks **+ / Create Appointment**, picks client (or adds new), service, therapist, and time from the same availability grid, then either takes the card, sends a **payment link**, or marks **pay in person**. It lands on the shared calendar, so it can't collide with an online booking.
- **Manage bookings** — reschedule (drag/drop), cancel, block off personal time, set vacations per therapist.
- **Payments & payouts** — prepayments/deposits flow into the Square balance and pay out to the linked bank on Square's payout schedule; refunds and no-show fees are handled from the appointment record.
- **Customers & marketing** — Square builds a client directory automatically (visit history, notes); optional reminders/marketing later.
- **Reporting** — bookings, revenue, and no-shows per service and per therapist.

---

## Costs

- **Square Appointments Free plan:** $0/month for a single location (unlimited staff calendars, online booking, reminders).
- **Processing fees (only when paid):** ~**2.9% + $0.30** per online/card-not-present transaction; ~**2.6% + $0.15** in person. No monthly software cost unless the owner later wants a paid tier's extras.

---

## Verification / testing

1. **Dashboard sanity check:** in Square, confirm each therapist shows correct hours and each service maps to the right staff and price.
2. **Live end-to-end test booking:** open the deployed site, click a gold button, confirm the widget loads inline and on-brand, book a real slot as a customer, and complete a **real (small) online payment** — then confirm the confirmation email/SMS arrives and the appointment appears on the Square calendar. Refund the test charge afterward.
3. **Double-booking test:** manually create a phone appointment in the dashboard for a specific therapist/time, then confirm that slot **disappears** from the online widget for that therapist.
4. **Fallback:** disable JavaScript and confirm the `<noscript>` link still routes to the Square hosted booking page.
5. **Cross-page + responsive:** verify buttons on `services.html`, `about.html`, `contact.html` all scroll to the working widget, and that the widget is usable on mobile.
6. **Regression:** confirm `js/main.js` `.rise` animations and scroll behavior still work with Square's script loaded; check no console errors.

---

### Sources
- [Square — Make a booking website / integration methods](https://squareup.com/gb/en/the-bottom-line/selling-anywhere/make-booking-website)
- [Square Community — Embed the Appointments booking widget](https://community.squareup.com/t5/Appointments-Bookings/Embed-the-Appointments-Booking-Widget-on-your-Website/m-p/804436)
- [Square — Appointments pricing & plans](https://squareup.com/us/en/appointments/pricing)
- [Square — Processing fees, plans, and software pricing](https://squareup.com/us/en/pricing)
