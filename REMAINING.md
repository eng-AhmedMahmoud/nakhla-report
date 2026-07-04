# Nakhla — What's remaining

> Companion to [nakhla-report.vercel.app](https://nakhla-report.vercel.app/). Generated 5 July 2026.
> Source of truth: [`docs/production-roadmap.json`](https://github.com/eng-AhmedMahmoud/collabstr-clone/blob/main/docs/production-roadmap.json) in the main repo.

Everything that must ship before Nakhla can take real money from KSA brands and pay real creators. Ordered by what unblocks the most downstream work.

---

## 0 · Infrastructure — critical path

The report bumped this to top because nothing else can be safely stress-tested on Neon + Vercel serverless.

| # | Item | Status |
|---|------|--------|
| 0.1 | Provision Hostinger KVM2 (Riyadh region if available) | Needs VPS IP |
| 0.2 | Install Postgres 16 + `pgbackrest`, bind to `127.0.0.1`, SCRAM auth, UFW `22/443` only | Blocked by 0.1 |
| 0.3 | `pgbackrest` full+incr → Cloudflare R2 with 30-day PITR | Blocked by 0.1 |
| 0.4 | `postgres_exporter` → Grafana Cloud free tier + alert rules | Blocked by 0.1 |
| 0.5 | Move NestJS API to same VPS (systemd + Caddy TLS), keep Vercel only for web + admin + report | Blocked by 0.1 |
| 0.6 | `pg_dump` Neon → restore → run Prisma migrations to verify parity → cut over `DATABASE_URL` → kill Neon project | Blocked by 0.1–0.5 |
| 0.7 | Optional: Neon free tier only for Vercel PR preview branches (isolated per-PR DB) | Optional |

---

## 1 · Launch blockers — cannot take money without these

### 1.1 Real payments (CF07, IN01–IN04, SA01–SA02)
- `PaymentIntent`, `EscrowHold`, `LedgerEntry`, `Payout`, `PayoutAccount` Prisma models
- HyperPay adapter (primary — mada + Apple Pay + STC Pay + Visa/MC + 3DS2)
- Tap Payments adapter (secondary, GCC redundancy)
- Moyasar adapter (SMB fallback)
- Tabby + Tamara BNPL on checkout
- Webhook signature verification + `IdempotencyKey` table (double-charge protection)
- Double-entry ledger: charge → escrow → release → payout
- Amounts as integer **halalas**, `currency='SAR'`

### 1.2 Auth security (CF08, CF16)
- Email verification tokens + endpoints (`/auth/verify-email/request` + `/confirm`)
- Password reset tokens + endpoints (`/password/forgot` + `/reset`)
- TOTP 2FA + backup codes (gates payouts)
- Refresh token via httpOnly Secure SameSite=Lax cookie (not JSON body — mobile app already has bearer path)
- `@nestjs/throttler` (login 5/min, signup 3/min, contact 5/hour)
- hCaptcha / Turnstile on signup + login + contact
- Per-device session list: `GET /auth/sessions` + `DELETE /auth/sessions/:id`

### 1.3 KSA compliance (CF09, CF10, IN05, IN07)
- `KycCase` model (provider, status, docs, nationalId/iqama, Wathq ref) — blocks payouts until approved
- `TaxProfile` (VAT number, ZATCA ref, WHT rate) — 5% WHT on non-resident payouts
- ZATCA Fatoora Phase 2 adapter — bilingual EN/AR XML, QR code, sequential numbering, crypto signature, real-time clearance
- SDAIA PDPL: DPO contact, consent management, data export, breach notification scaffolding (partly shipped)

### 1.4 Broken core loops (CF11, CF12)
- Wire creator profile Save + Share buttons (both dead)
- Convert creator-dashboard packages create/delete from broken `/api/packages/*` form posts → client component hitting real API

---

## 2 · Critical UX fixes — mobile-first KSA is ~85% phones

| ID | File | Issue |
|----|------|-------|
| CF01 | `apps/web/src/components/filter-bar.tsx` | Filter pills do nothing (only `q` submits), English-only, overflow on mobile/RTL |
| CF02 | `apps/web/src/app/messages/messages-ui.tsx` | Grid squeezes chat to ~240px on mobile |
| CF03, CF14 | `apps/admin/src/components/shell.tsx` + `apps/web/src/components/header.tsx` | No mobile nav on either app — invisible on phones |
| CF04, CF05 | Every admin `<table>` | Overflow under 1024px; needs shared `<ResponsiveTable>` |
| CF06 | `apps/admin/src/lib/format.ts` | Hardcoded `LOCALE='en-SA'` — Arabic users see English currency/date everywhere |
| CF13 | `globals.css` in web + admin | `.text-xs { 0.9rem }` + `html { 19px }` overrides silently break every Tailwind size |
| CF15 | `apps/web/src/components/user-menu.tsx` | Dropdown pops off-screen in RTL, no keyboard access |
| CF17 | `apps/web/src/app/pricing/page.tsx` | Bypasses formatter — AR users see raw English dollar literals |

---

## 3 · Missing pages (13)

- `/regulations/mawthooq` — Mawthooq compliance hub (permit info + submit form)
- `/regulations/zatca` — ZATCA Phase 2 FAQ + VAT prompt over SAR 375k threshold
- `/checkout/success` + `/checkout/cancel` — PSP 3DS return URLs with invoice download
- `/creator-dashboard/payouts` — KYC + IBAN/STC Pay + tax form + history
- `/dashboard/billing` — Saved methods, VAT profile, downloadable ZATCA invoices
- `/influencers/[city]` + `/influencers/[platform]` — Programmatic SEO (Riyadh/Jeddah/Khobar/Dammam/Makkah/Madinah/Alkhobar + IG/TT/Snap/YT), bilingual
- `/auth/verify-email` + `/auth/reset-password` — Tied to CF08 backend
- `/auth/2fa` — TOTP QR + backup codes
- `/admin/disputes/[id]` — Dispute resolution workspace with SLA timer
- `/admin/finance/ledger` + `/admin/finance/reconciliation` — PSP settlements vs internal ledger, VAT + WHT reports
- `/admin/compliance/mawthooq` — Queue by permit status, bulk re-verify, block if expired
- `/inbox/offers` — In-thread Offer cards → one-click convert to Order (Collabstr pattern)
- `/about/trust-safety` — Escrow, KYC, dispute process, refund policy, content moderation, report flows

---

## 4 · Missing components (13) + schema additions (12)

**Components:** `<SarAmount>` (bidi-isolated), `<DirArrow>` (locale-aware), `<MobileNav>` (sheet drawer), `<ResponsiveTable>`, `<StatusPill>` (translated), `<MobileStickyCta>`, `<LiveRegion>` (aria), `<Toast>` (replace all `alert()`), `<PaymentMethodBadge>`, rewritten `format.ts` (Intl + bidi), `<SeasonalBanner>` (Ramadan / Sep 23 / Feb 22 / Eid), `<OfferCard>` (in-thread), Idempotency middleware + webhook controller.

**Schema:** `PaymentIntent`, `EscrowHold`, `LedgerEntry`, `PayoutAccount` + `Payout`, `KycCase`, `TaxProfile` + `Invoice`, `Dispute` (status enum already has `disputed`), `SocialAccount` + `ProfileVerification`, `Offer` + `MessageAttachment`, `FileAsset`, `AuditLog`, `IdempotencyKey` + `Webhook` + `WebhookDelivery`, `Report` + `Block` + `NotificationPreference` + `PushSubscription`.

---

## 5 · Integrations (14)

Payments (IN01–IN04) — HyperPay, Tap, Moyasar, Tabby+Tamara.
Compliance (IN05, IN07) — ZATCA Fatoora, SDAIA PDPL.
Comms (IN06, IN12) — Unifonic/Taqnyat SMS OTP, WhatsApp Business Cloud (deep-link to accepted orders).
Social (IN08) — Instagram + TikTok + YouTube + Snapchat OAuth for verified follower counts.
Infra (IN09–IN11, IN14) — Meilisearch (Arabic + English full-text), Cloudflare R2 uploads + ClamAV scan, Sentry + PostHog, hCaptcha/Turnstile.
Localization (IN13) — Umm al-Qura Hijri calendar via `Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura')`.

---

## 6 · Polish (16) — after launch blockers

Footer i18n, dashboard-brand-bar drop EN+AR concat, KPI grid mobile, Asia/Riyadh timezone everywhere, campaign step placeholders, dead forgot-password/contact/notifications/billing forms, `me-*` logical properties on chips, `mark all read` → client component, `dir='ltr'` on card inputs, `rounded-ee/es` on chat bubbles, localized pagination, `SameSite=Lax + Secure` cookie helper, `flex-wrap` + `shrink-0` on admin PageHeader, flow-map localization, replace all `alert()` with toast.

---

## Prioritized shipping order

1. **Infra** (§0) — 1–2 days once VPS IP is provided
2. **Auth security + email verify + password reset** (§1.2) — 2–3 days, unblocks §1.1
3. **Payments + escrow + ledger + webhooks** (§1.1) — 5–7 days on HyperPay first, others later
4. **Mobile nav + admin responsive + i18n fixes** (§2) — 2 days, unblocks user testing
5. **KYC + ZATCA + WHT** (§1.3) — 4–6 days, must precede live payouts
6. **Missing pages + components** (§3, §4) — parallel, 5–8 days
7. **Integrations remainder** (§5) — parallel, ongoing
8. **Polish** (§6) — after launch

Rough total: ~4–6 weeks focused work to a legally-launchable MVP in KSA.
