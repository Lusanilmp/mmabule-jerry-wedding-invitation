/* =========================================
   WEDDING CONFIGURATION
   Update these values before deploying.
========================================= */
const RSVP_WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER"; // e.g. "27821234567" — country code, no + or leading 0
const DAY_ONE_MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Turf Lodge, 792 Unit E, Mankweng, Pieter Mokaba");
const DAY_TWO_MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("10476 Segogela Street, Janefurse, Marulaneng");
const INVITATION_URL = "YOUR_FINAL_DEPLOYED_URL";
const SOCIAL_IMAGE_URL = "YOUR_FINAL_PUBLIC_COUPLE_IMAGE_URL";

/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initEnvelope();
  initNav();
  initMobileMenu();
  initReveals();
  initHero();
  initMusic();
  initMaps();
  initRSVP();
  initCopyAccount();
  initRSVPShortcut();
});

/* ---------- Envelope ---------- */
function initEnvelope() {
  const screen = document.getElementById("envelope-screen");
  const envelopeObject = document.getElementById("envelope-object");
  const openBtn = document.getElementById("open-invitation-btn");
  const body = document.body;

  openBtn.addEventListener("click", () => {
    envelopeObject.classList.add("open");

    // Attempt to start music on this user gesture (satisfies autoplay policies)
    startMusicFromGesture();

    setTimeout(() => {
      screen.classList.add("dismissed");
      body.classList.remove("envelope-active");
      revealHero();
      document.getElementById("site-nav").classList.add("visible");
    }, 900);
  }, { once: true });
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById("site-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Hero reveal ---------- */
function initHero() {
  // Hero reveals only once the envelope has been opened (see revealHero below)
}

function revealHero() {
  const hero = document.querySelector(".hero");
  requestAnimationFrame(() => {
    hero.classList.add("revealed");
  });
}

/* ---------- Scroll reveals ---------- */
function initReveals() {
  const targets = document.querySelectorAll(".reveal, .gallery-item");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Music ---------- */
let audioEl;

function initMusic() {
  audioEl = document.getElementById("wedding-audio");
  const control = document.getElementById("music-control");

  control.addEventListener("click", () => {
    if (audioEl.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  audioEl.addEventListener("error", () => {
    // Music file missing or unavailable — keep the control visible but inert-looking.
    control.style.opacity = "0.4";
    control.setAttribute("aria-label", "Music unavailable");
  });
}

function playMusic() {
  const control = document.getElementById("music-control");
  audioEl.play().then(() => {
    control.classList.add("playing");
    control.setAttribute("aria-pressed", "true");
    control.setAttribute("aria-label", "Pause music");
  }).catch(() => {
    // Autoplay blocked by the browser — this is expected behaviour, not an error state.
    control.classList.remove("playing");
  });
}

function pauseMusic() {
  const control = document.getElementById("music-control");
  audioEl.pause();
  control.classList.remove("playing");
  control.setAttribute("aria-pressed", "false");
  control.setAttribute("aria-label", "Play music");
}

function startMusicFromGesture() {
  const control = document.getElementById("music-control");
  control.classList.add("visible");
  playMusic();
}

/* ---------- Maps ---------- */
function initMaps() {
  const dayOneBtn = document.getElementById("day-one-directions");
  const dayTwoBtn = document.getElementById("day-two-directions");

  if (DAY_ONE_MAP_URL && !DAY_ONE_MAP_URL.includes("YOUR_DAY_ONE")) {
    dayOneBtn.href = DAY_ONE_MAP_URL;
  } else {
    dayOneBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Directions for Day One have not been configured yet.");
    });
  }

  if (DAY_TWO_MAP_URL && !DAY_TWO_MAP_URL.includes("YOUR_DAY_TWO")) {
    dayTwoBtn.href = DAY_TWO_MAP_URL;
  } else {
    dayTwoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Directions for Day Two have not been configured yet.");
    });
  }
}

/* ---------- RSVP ---------- */
function initRSVP() {
  const btn = document.getElementById("rsvp-whatsapp-btn");
  const message =
    "Hello, thank you for the invitation. I would like to RSVP for the wedding of Mmabule Shayi and Jerry Segogela.";

  if (RSVP_WHATSAPP_NUMBER && RSVP_WHATSAPP_NUMBER !== "YOUR_WHATSAPP_NUMBER") {
    const whatsappURL = `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.href = whatsappURL;
  } else {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("RSVP number has not been configured yet. Please update RSVP_WHATSAPP_NUMBER in script.js.");
    });
  }
}

/* ---------- Floating RSVP shortcut ---------- */
function initRSVPShortcut() {
  const shortcut = document.getElementById("rsvp-shortcut");
  const rsvpSection = document.getElementById("rsvp");

  if (!("IntersectionObserver" in window)) {
    shortcut.classList.add("visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Show once we've scrolled past the hero, hide once RSVP itself is visible
        shortcut.classList.toggle("visible", !entry.isIntersecting && window.scrollY > window.innerHeight * 0.6);
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(rsvpSection);

  window.addEventListener("scroll", () => {
    if (window.scrollY < window.innerHeight * 0.6) {
      shortcut.classList.remove("visible");
    }
  });
}

/* ---------- Copy account number ---------- */
function initCopyAccount() {
  const btn = document.getElementById("copy-account-btn");
  const confirm = document.getElementById("copy-confirm");
  const accountNumber = document.getElementById("account-number").textContent.trim();

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch (err) {
      // Fallback for browsers without Clipboard API support
      const temp = document.createElement("textarea");
      temp.value = accountNumber;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    confirm.classList.add("show");
    setTimeout(() => confirm.classList.remove("show"), 2200);
  });
}
