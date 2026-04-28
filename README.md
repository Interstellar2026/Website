# Interstellar I.S. — isinterstellar.com

Production website for **Interstellar I.S. LLC**, a veteran-owned independent technology services brokerage based in Aurora, Colorado.

> **Tagline:** No line of sight. No limit.

## Site Architecture

Static HTML/CSS/JS site, deployed via **GitHub → Netlify** continuous deployment. No backend required for Phase 1 — Atlas chatbot runs entirely client-side, MS Bookings is embedded via iframe, 3CX live chat handed off via direct URL.

## Repo Structure

```
.
├── README.md                                # this file
├── netlify.toml                             # Netlify build & header config
├── .gitignore
├── LICENSE
└── public/                                  # everything Netlify serves
    ├── index.html                           # homepage with aurora hero
    ├── _redirects                           # URL routing rules
    ├── robots.txt                           # search engine directives
    ├── sitemap.xml                          # for Google indexing
    ├── manifest.json                        # PWA install metadata
    ├── solutions/
    │   ├── index.html                       # solutions hub
    │   ├── voice-collaboration/index.html
    │   ├── contact-center/index.html
    │   ├── network-connectivity/index.html
    │   ├── cybersecurity/index.html
    │   ├── cloud-data-center/index.html
    │   ├── mobility-iot/index.html
    │   └── ai-customer-experience/index.html
    ├── process/index.html                   # 5-step engagement model
    ├── about/index.html                     # founder + values
    ├── contact/index.html                   # MS Bookings embed
    ├── legal/
    │   ├── privacy/index.html               # CPA-aligned (counsel review pending)
    │   ├── terms/index.html                 # template (counsel review pending)
    │   └── agent-disclosure/index.html      # broker disclosure (counsel review pending)
    └── assets/
        ├── css/main.css                     # full design system + aurora animation
        ├── js/main.js                       # mobile nav, smooth scroll, reveals
        ├── js/atlas.js                      # chatbot logic + 3CX handoff
        └── img/
            ├── favicon.svg                  # orbital aperture brand mark
            ├── apple-touch-icon.svg
            └── og-image.svg
```

## Design System

- **Colors:** Deep violet base (#0F0A24) with engineered accents — gold (#FFD60A), teal (#00F5D4), violet (#9D5FFF), rose (#FF5599)
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (technical labels)
- **Aurora hero animation:** 7.5s cycle (6s aurora write/erase + 1.5s clean white hold)
- **Sub-pages:** Static gradient header, no animation, for readability and battery efficiency
- **Accessibility:** WCAG 2.2 AA compliant, `prefers-reduced-motion` fully respected
- **Responsive:** 5 breakpoints — 320, 481, 769, 1025, 1441+

## Atlas Chatbot

Client-side scripted FAQ chatbot — **no backend, no API costs**. Located at `assets/js/atlas.js`.

**Behavior:**
- 4-question qualification flow: industry → size → pain → urgency
- 30 FAQ branches with keyword matching for free-text questions
- High-value auto-detection: routes to founder (`/marcshamp`) when prospect is 1000+ employees, this-week urgency, OR contract expiring
- Standard escalation routes to team queue (`/interstellaris`) with qualification context as URL parameter
- MS Bookings integration: opens `BookTimeWithMe@isinterstellar.com` in new tab
- Email capture fallback for low-intent visitors

**Stage 2 upgrade path:** if you want true LLM-powered chat post-launch, deploy a FastAPI backend on Render with an Anthropic API key, then update `atlas.js` to POST messages to that endpoint instead of running scripted logic.

## Integrations

| Service | Purpose | URL |
|---|---|---|
| **MS Bookings** | Discovery call scheduling | `https://outlook.office.com/book/BookTimeWithMe@isinterstellar.com/?ismsaljsauthenabled` |
| **3CX team queue** | Live chat for general inquiries | `https://1476.3cx.cloud/interstellaris` |
| **3CX founder direct** | Live chat for high-value prospects | `https://1476.3cx.cloud/marcshamp` |

## Deployment to Netlify (via GitHub)

### First-time setup

1. Create a new GitHub repository (e.g., `isinterstellar.com` or `interstellar-is-website`)
2. Push this repo:
   ```bash
   git init
   git add .
   git commit -m "Initial production website"
   git branch -M main
   git remote add origin git@github.com:YOUR-USERNAME/isinterstellar.com.git
   git push -u origin main
   ```
3. Log into Netlify → "Add new site" → "Import an existing project" → "GitHub" → select repo
4. Set publish directory: `public`
5. Build command: leave blank (no build step needed)
6. Click "Deploy"
7. Wait ~30 seconds. Netlify gives you a `*.netlify.app` URL.
8. Add custom domain in Netlify domain settings: `isinterstellar.com` and `www.isinterstellar.com`
9. Update DNS at your registrar to point to Netlify's load balancer (Netlify provides exact records).

### Subsequent deploys

```bash
git add .
git commit -m "describe change"
git push
```

Netlify auto-deploys on every `git push` to `main`. Branch deploys (preview URLs) work for any non-main branch.

## Pre-Launch Checklist

- [ ] Brief patent counsel on tagline plan and obtain written sign-off (see internal memo)
- [ ] Have legal counsel review the three legal pages (Privacy, Terms, Agent Disclosure) — currently working templates
- [ ] Replace founder placeholder avatar (`MS` initials in gradient) with actual headshot
- [ ] Generate proper PNG OG image (1200×630) — currently using SVG placeholder
- [ ] Update Sandler Partners and Telarus partner-of-record names from "Shampion Transport, LLC" to "Interstellar I.S. LLC" (administrative cleanup)
- [ ] File Statement of Change with Colorado SOS if principal address requires update
- [ ] Configure GA4 measurement ID in `index.html` (stub commented out in `<head>`) and uncomment
- [ ] Verify MS Bookings embed renders correctly on `/contact/`
- [ ] Test 3CX `/interstellaris` and `/marcshamp` URLs route correctly
- [ ] Test on real iOS Safari, Android Chrome, desktop Chrome/Firefox/Edge/Safari

## Stage 2: Backend (optional, post-launch)

If/when you want:
- Live LLM-powered Atlas
- Lead capture stored in PostgreSQL instead of just emailed
- Custom analytics dashboard

...deploy a FastAPI backend on Render (same pattern as the NexusPay stack). The frontend is already structured to call backend endpoints — just update the Atlas config in `atlas.js` to point at your Render API URL when ready.

## Brand & Legal

- **Entity:** Interstellar I.S. LLC (Colorado, EIN 92-0737711, formed 2022 originally as Shampion Transport, LLC; renamed 2026-01-13)
- **Address:** 11150 E Mississippi Ave, STE 300, Aurora, CO 80012
- **Phone:** (720) 735-8800
- **Email:** admin@isinterstellar.com
- **Master agencies:** Sandler Partners (sub-ISO under partner agreement) · Telarus (per Telarus enrollment package)
- **Founder:** Marc Shamp, U.S. Veteran, Sole Managing Member

## License

© 2026 Interstellar I.S. LLC. All rights reserved. See LICENSE file.

## Issues / Maintenance

This is a marketing website. Issues, content updates, or design changes are made directly in this repo. For deeper architectural changes, see the comments inside `assets/css/main.css` and `assets/js/atlas.js` for design intent.
