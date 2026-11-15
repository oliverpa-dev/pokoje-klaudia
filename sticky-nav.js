/* The sticky header pops out of the main navigation.
 *
 * As the page header leaves the top of the viewport the sticky bar springs
 * down from behind the same edge, unfolding from its top edge with a short
 * overshoot, so it reads as being pushed out of the navigation above rather
 * than fading in on its own.
 *
 * Animation: Motion (motion.dev) 13.3.0 — framework-agnostic, runs on the
 * browser's native Web Animations API. The trigger is an IntersectionObserver
 * watching the page header, so the pop fires exactly as that header clears.
 *
 * If the module cannot load, or the viewer prefers reduced motion, the class
 * toggle and the CSS transition in styles.css take over.
 */

var sticky = document.querySelector(".sticky-header");
var pageHeader = document.querySelector(".hero__header");

/* Fires as the page header's bottom edge leaves the top of the viewport */
function observe(onChange) {
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        onChange(!entries[0].isIntersecting);
      },
      { rootMargin: "0px", threshold: 0 }
    ).observe(pageHeader);
    return;
  }

  window.addEventListener(
    "scroll",
    function () {
      onChange(window.pageYOffset > pageHeader.offsetTop + pageHeader.offsetHeight);
    },
    { passive: true }
  );
}

function fallback() {
  observe(function (visible) {
    sticky.classList.toggle("is-visible", visible);
  });
}

async function enhance() {
  if (!sticky || !pageHeader) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fallback();
    return;
  }

  var motion;
  try {
    motion = await import("https://cdn.jsdelivr.net/npm/motion@13.3.0/+esm");
  } catch (error) {
    fallback();
    return;
  }

  var animate = motion.animate;
  if (typeof animate !== "function") {
    fallback();
    return;
  }

  sticky.classList.add("is-animated");

  /* Overshoot on the way out, so it lands with a bounce rather than a glide */
  var POP = { type: "spring", duration: 0.55, bounce: 0.38 };
  var TUCK = { duration: 0.22, ease: "easeIn" };

  var hidden = "translateY(-100%) scaleY(0.86)";
  var shown = "translateY(0%) scaleY(1)";

  var playing = null;
  var visible = false;

  function run(show) {
    if (show === visible) return;
    visible = show;
    if (playing) playing.stop();

    if (show) {
      /* Pin the start state inline BEFORE the class lands, otherwise
         .is-visible paints the finished state for one frame and the bar
         flashes into place before the spring runs. */
      sticky.style.opacity = "0";
      sticky.style.transform = hidden;
      sticky.classList.add("is-visible");

      playing = animate(
        sticky,
        { opacity: [0, 1], transform: [hidden, shown] },
        POP
      );
      return;
    }

    playing = animate(sticky, { opacity: [1, 0], transform: [shown, hidden] }, TUCK);
    playing.finished
      .then(function () {
        if (!visible) sticky.classList.remove("is-visible");
      })
      .catch(function () {
        /* superseded by a newer animation */
      });
  }

  observe(run);
}

enhance();
