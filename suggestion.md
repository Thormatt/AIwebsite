# Suggestions

## Critical Fixes
- **Make contact submissions reliable** – ensure `/api/contact` actually delivers messages rather than silently logging. Either configure Resend (verify domain, set `RESEND_API_KEY`) or plug in an alternative (Postmark, Formspree). Update user-facing copy so execs know their note reached you instead of the current false-positive success state (`api/contact.js:35`, `script.js:172`).

## Conversion Improvements
- **Swap “Book Executive Session” for a real booking path** – link to a scheduling tool (Calendly, SavvyCal, Cal.com) or open email compose with prefilled subject so interested CEOs don’t have to hunt (`index.html:72`, `index.html:390`).
- **Add visible citations beside hero metrics** – reference the McKinsey study (and any other data sources) directly near the stats to keep skeptical board members onside (`index.html:59`, `index.html:86`).
- **Surface quick social proof above the fold** – add a short testimonial, recognizable logo ribbon, or quantified outcome to complement the longer biography (`index.html:423`).

## Reinforcement Ideas
- Highlight the free tools with a one-line credibility hook (“Used by X execs last quarter”) to signal traction.
- Add a short explainer video or 90-second audio intro to humanize the offer and differentiate from template advisory sites.
- Consider an opt-in for a tightly scoped briefing (e.g., “AI Board Prep Checklist”) to capture softer leads without undermining the “no hype” stance.

## Implementation Notes
- After shipping form fixes, send yourself a test submission in production and add monitoring/alerts so failures are obvious.
- Align typography/color tweaks with the existing palette in `styles.css` to maintain the premium aesthetic.
