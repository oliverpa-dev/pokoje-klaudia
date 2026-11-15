/* Hero background video.
   The clip plays continuously; the control exists so anyone who needs the
   motion to stop can stop it (WCAG 2.2.2 Pause, Stop, Hide). */
(function () {
  var hero = document.querySelector(".hero");
  var video = document.getElementById("hero-video");
  var toggle = document.querySelector(".hero__motion-toggle");

  if (!hero || !video || !toggle) return;

  var LABELS = {
    play: "Odtwórz wideo w tle",
    stop: "Zatrzymaj wideo w tle"
  };

  /* Set once the viewer stops the clip themselves, so nothing starts it again. */
  var stoppedByViewer = false;

  function t(value) {
    return window.i18n ? window.i18n.t(value) : value;
  }

  function render() {
    var playing = !video.paused && !video.ended;
    hero.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-pressed", String(playing));
    toggle.setAttribute("aria-label", t(playing ? LABELS.stop : LABELS.play));
  }

  function play() {
    var attempt = video.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(render);
  }

  video.addEventListener("play", render);
  video.addEventListener("pause", render);
  document.addEventListener("languagechange", render);

  toggle.addEventListener("click", function () {
    if (video.paused) {
      stoppedByViewer = false;
      play();
    } else {
      stoppedByViewer = true;
      video.pause();
    }
  });

  /* Keep it playing: browsers that refuse autoplay (Safari low-power mode,
     data saver) are given another chance on the first interaction. */
  function recover() {
    if (video.paused && !stoppedByViewer) play();
  }
  ["pointerdown", "keydown", "touchstart"].forEach(function (evt) {
    window.addEventListener(evt, recover, { once: true, passive: true });
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) recover();
  });

  render();
})();
