/* Language switcher (Figma nodes 190:3685 in the sub-header and 190:4022 in
   the footer; dropdown items 190:3652).
   Each control opens a small dropdown and marks the chosen language. The two
   instances stay in sync, so changing the language in the footer updates the
   one at the top of the page as well. Choosing a language hands off to
   i18n.js, which translates the page. */
(function () {
  var roots = Array.prototype.slice.call(
    document.querySelectorAll("[data-language]")
  );
  if (!roots.length) return;

  var switchers = [];

  function closeAll(except) {
    switchers.forEach(function (s) {
      if (s !== except) s.setOpen(false);
    });
  }

  /* Point every control at the same language and translate the page */
  function select(lang, translate) {
    if (translate !== false && window.i18n) window.i18n.set(lang);
    switchers.forEach(function (s) {
      var chosen = null;

      s.items.forEach(function (item) {
        var active = item.getAttribute("data-lang") === lang;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-checked", String(active));
        if (active) chosen = item;
      });

      /* Mirror the chosen flag and code into the closed control */
      if (chosen) s.current.innerHTML = chosen.innerHTML;
    });
  }

  roots.forEach(function (root) {
    var toggle = root.querySelector(".language__toggle");
    var menu = root.querySelector(".language__menu");
    var current = root.querySelector(".language__current");
    var items = Array.prototype.slice.call(
      root.querySelectorAll(".language__item")
    );
    if (!toggle || !menu || !current || !items.length) return;

    var switcher = {
      root: root,
      toggle: toggle,
      current: current,
      items: items,
      isOpen: function () {
        return toggle.getAttribute("aria-expanded") === "true";
      },
      setOpen: function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        menu.hidden = !open;
      }
    };

    toggle.addEventListener("click", function () {
      var open = !switcher.isOpen();
      closeAll(switcher);
      switcher.setOpen(open);
    });

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        select(item.getAttribute("data-lang"));
        switcher.setOpen(false);
        toggle.focus();
      });
    });

    switcher.setOpen(false);
    switchers.push(switcher);
  });

  /* Reflect the language resolved by i18n.js (?lang=, then localStorage)
     in both controls, without re-translating what is already correct. */
  select(window.i18n ? window.i18n.lang : "pl", false);

  document.addEventListener("click", function (event) {
    switchers.forEach(function (s) {
      if (s.isOpen() && !s.root.contains(event.target)) s.setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    switchers.forEach(function (s) {
      if (s.isOpen()) {
        s.setOpen(false);
        s.toggle.focus();
      }
    });
  });
})();
