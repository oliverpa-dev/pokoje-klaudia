/* "Co myślą o nas goście?" — the review marquee (node 110:136).
 *
 * The cards live in index.html so the section still reads correctly with
 * JavaScript off; this module only
 *   1. clones the card group once, so the track can loop seamlessly, and
 *   2. wires the Zatrzymaj / Wznów control drawn at node 181:3515.
 *
 * NOTE: only the first review is the one shown in the Figma frame. The rest
 * are PLACEHOLDER copy — replace them with real guest reviews (e.g. pulled
 * from the Google Business Profile) before this goes live.
 */
(function () {
  var section = document.querySelector(".reviews");
  if (!section) return;

  var track = section.querySelector(".reviews__track");
  var group = section.querySelector(".reviews__group");
  var toggle = section.querySelector(".reviews__toggle");
  var icon = section.querySelector(".reviews__toggle-icon");
  var label = section.querySelector(".reviews__toggle-label");
  if (!track || !group || !toggle) return;

  /* Travel speed in CSS pixels per second. The duration is derived from it so
     the cards drift at the same pace however many reviews are in the list. */
  var SPEED = 55;

  var LABELS = { pause: "Zatrzymaj", play: "Wznów" };
  var ICONS = {
    pause: "assets/icons/pause-circle-fill.svg",
    play: "assets/icons/play-circle-fill.svg"
  };

  /* A second, identical group trails the first. Once the track has travelled
     exactly one group (plus the gap between them) the clone sits where the
     original started, so restarting the animation is invisible. */
  var clone = group.cloneNode(true);
  clone.classList.add("reviews__group--clone");
  clone.setAttribute("aria-hidden", "true");
  /* The duplicate is decorative: keep it off the tab order and out of the
     accessibility tree so each review is announced once. */
  clone.querySelectorAll("[role='img']").forEach(function (el) {
    el.removeAttribute("role");
    el.removeAttribute("aria-label");
  });
  track.appendChild(clone);

  function measure() {
    var width = group.getBoundingClientRect().width;
    if (!width) return;
    track.style.setProperty("--reviews-duration", width / SPEED + "s");
  }

  measure();
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(measure).observe(group);
  } else {
    window.addEventListener("resize", measure);
  }
  /* Card widths settle once the webfont and star icons have loaded */
  window.addEventListener("load", measure);

  function t(value) {
    return window.i18n ? window.i18n.t(value) : value;
  }

  function render(paused) {
    section.classList.toggle("is-paused", paused);
    toggle.setAttribute("aria-pressed", String(paused));
    label.textContent = t(paused ? LABELS.play : LABELS.pause);
    icon.src = paused ? ICONS.play : ICONS.pause;
  }

  /* The track runs as soon as the clone is in place. The Zatrzymaj control
     is the way to stop it (WCAG 2.2.2 Pause, Stop, Hide); note that this
     deliberately starts moving even under prefers-reduced-motion. */
  var paused = false;
  section.classList.add("is-ready");
  render(paused);

  toggle.addEventListener("click", function () {
    paused = !paused;
    render(paused);
  });

  document.addEventListener("languagechange", function () {
    render(paused);
  });

  /* Tabbing into a card stops the track so it cannot scroll out from under
     the focused element; it resumes on the way out unless it was stopped. */
  var pausedByFocus = false;

  track.addEventListener("focusin", function () {
    if (paused) return;
    pausedByFocus = true;
    section.classList.add("is-paused");
  });

  track.addEventListener("focusout", function () {
    if (!pausedByFocus) return;
    pausedByFocus = false;
    if (!paused) section.classList.remove("is-paused");
  });
})();
