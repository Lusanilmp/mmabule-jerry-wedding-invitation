# Mmabule & Jerry — Wedding Invitation Website

A cinematic digital wedding invitation. Plain HTML/CSS/JS — no build step, no dependencies to install.

## Folder structure

```
/
├── index.html
├── style.css
├── script.js
├── favicon/
│   └── favicon.svg
├── images/
│   ├── hero.jpg
│   ├── couple-1.jpg ... couple-4.jpg
│   ├── bride.jpg
│   ├── groom.jpg
│   └── apex-logo.jpg
└── music/
    └── Shai.mp3   ← you need to add this file (see below)
```

## 1. Before you deploy — required configuration

Open **script.js** and edit the block at the top:

```js
const RSVP_WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";
```
Replace with the couple's WhatsApp number in international format, digits only, no `+` or leading `0` — e.g. a South African number `082 123 4567` becomes `"27821234567"`. Until this is set, the RSVP button will show a friendly reminder instead of opening WhatsApp.

The Day One and Day Two Google Maps links are already built from the addresses you gave me (Turf Lodge, Mankweng / Segogela Street, Janefurse). If you'd rather pin an exact location, replace the `DAY_ONE_MAP_URL` / `DAY_TWO_MAP_URL` values with a specific Google Maps share link.

## 2. Add the music

Drop your song into `music/Shai.mp3` (the filename must match exactly, or update the `src` on the `<audio>` tag in `index.html`). If the file is missing, the invitation still works — the music button just stays visible but inactive.

## 3. Open Graph image (for WhatsApp/Facebook link previews)

Once the site is deployed, edit these lines in `index.html`:

```html
<link rel="canonical" href="YOUR_FINAL_DEPLOYED_URL">
<meta property="og:image" content="YOUR_FINAL_PUBLIC_COUPLE_IMAGE_URL">
<meta property="og:url" content="YOUR_FINAL_DEPLOYED_URL">
<meta name="twitter:image" content="YOUR_FINAL_PUBLIC_COUPLE_IMAGE_URL">
```

Replace `YOUR_FINAL_DEPLOYED_URL` with your live site address (e.g. `https://mmabule-and-jerry.netlify.app`), and `YOUR_FINAL_PUBLIC_COUPLE_IMAGE_URL` with the full public URL to `images/hero.jpg` on that same domain (e.g. `https://mmabule-and-jerry.netlify.app/images/hero.jpg`). This step matters — without an absolute URL, the preview image will not show up when the link is shared.

Also update the same two values in `script.js` (`INVITATION_URL`, `SOCIAL_IMAGE_URL`) — they're kept there for reference/future use.

## 4. Favicon

A simple "M & J" monogram favicon is included as `favicon/favicon.svg`. Modern browsers support SVG favicons directly. If you want an icon for iOS home-screen shortcuts, export the SVG as a 180×180 PNG named `favicon/apple-touch-icon.png` and add:
```html
<link rel="apple-touch-icon" href="favicon/apple-touch-icon.png">
```

## 5. Deploying (Netlify — free, no account setup beyond signing in)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole project folder onto the page
3. Netlify gives you a live URL immediately
4. Come back and fill in the Open Graph URLs from Step 3 above, then re-upload

## What's already wired up

- **Envelope opening** — tap "Open Invitation" to reveal the site; music attempts to play on that same tap (satisfies browser autoplay rules)
- **RSVP** — pre-filled WhatsApp message, once you've added the number
- **Get Directions** — both buttons open Google Maps with the correct address
- **Copy Account Number** — one tap, with a confirmation message
- **Gallery** — scroll-triggered reveals, respects "reduce motion" settings
- **Footer** — includes your Apex Technical Solutions credit, logo, phone number, and website link, exactly as requested

## Notes on content

- Guest accommodation contact (Boeketlong Lodge — Pheladi, +27 60 233 6311) is included as a note under the two wedding-day cards, since you shared that image alongside the wedding photos.
- Day One venue is labelled "Turf Lodge" based on the Google Maps screenshot you shared — double-check this is correct before sending the invitation out.
