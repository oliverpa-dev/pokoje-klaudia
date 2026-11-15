/* Room-type switcher for the "Pokoje" section.
 *
 * NOTE: the Figma frame only defines the single-room ("jednoosobowy") content.
 * Everything for the other three room types below is PLACEHOLDER data —
 * names follow the chips, bed counts and prices are extrapolated, and the
 * photos are the same five images in a rotated order because no other
 * photography exists yet. Replace the entries, not the wiring.
 */
(function () {
  var PHOTOS = [
    { src: "assets/images/room-main.jpg", alt: "widok ogólny" },
    { src: "assets/images/room-2.jpg", alt: "część wypoczynkowa" },
    { src: "assets/images/room-3.jpg", alt: "widok od strony okna" },
    { src: "assets/images/room-4.jpg", alt: "łóżko" },
    { src: "assets/images/room-5.jpg", alt: "wnętrze z telewizorem" }
  ];

  /* Rotates the placeholder gallery so switching is visibly different. */
  function rotate(by) {
    return PHOTOS.slice(by).concat(PHOTOS.slice(0, by));
  }

  var BATHROOM = { icon: "bath-fill", label: "1 łazienka" };
  var TV = { icon: "tv-2-fill", label: "Telewizor" };
  var WIFI = { icon: "wifi-fill", label: "Wi-Fi" };
  var bed = function (label) {
    return { icon: "hotel-bed-fill", label: label };
  };

  /* PLACEHOLDER copy, like the rest of the non-jednoosobowy data below. */
  var ROOMS = {
    jednoosobowy: {
      name: "Pokój jednoosobowy",
      description:
        "Przytulny i komfortowy pokój jednoosobowy, idealny dla osób podróżujących służbowo lub turystycznie. Starannie urządzone wnętrze zapewnia przestrzeń do odpoczynku i relaksu po intensywnym dniu. Pokój wyposażony jest w wygodne łóżko, prywatną łazienkę, telewizor oraz bezpłatny dostęp do Wi-Fi. To doskonały wybór dla osób ceniących wygodę, funkcjonalność i spokojną atmosferę podczas pobytu.",
      price: "od 180zł / noc",
      amenities: [bed("1 łóżko"), BATHROOM, TV, WIFI],
      photos: rotate(0)
    },
    dwuosobowy: {
      name: "Pokój dwuosobowy",
      description:
        "Komfortowy pokój dwuosobowy z dwoma łóżkami, prywatną łazienką i telewizorem. Doskonały wybór na wspólny wypoczynek nad morzem, z bezpłatnym dostępem do Wi-Fi i spokojną atmosferą przez cały pobyt.",
      price: "od 240zł / noc",
      amenities: [bed("2 łóżka"), BATHROOM, TV, WIFI],
      photos: rotate(1)
    },
    trzyosobowy: {
      name: "Pokój trzyosobowy",
      description:
        "Przestronny pokój trzyosobowy z własną łazienką, telewizorem i miejscem na bagaż. Sprawdzi się zarówno dla rodziny, jak i grupy przyjaciół szukających wygodnej bazy blisko plaży.",
      price: "od 300zł / noc",
      amenities: [bed("3 łóżka"), BATHROOM, TV, WIFI],
      photos: rotate(2)
    },
    czteroosobowy: {
      name: "Pokój czteroosobowy",
      description:
        "Największy pokój w pensjonacie, przeznaczony dla czterech osób, z prywatną łazienką i telewizorem. Dużo przestrzeni dla rodziny, bezpłatne Wi-Fi i spokojna okolica tuż przy plaży.",
      price: "od 360zł / noc",
      amenities: [bed("4 łóżka"), BATHROOM, TV, WIFI],
      photos: rotate(3)
    }
  };

  var tabs = [].slice.call(document.querySelectorAll(".rooms__filters [role='tab']"));
  var panel = document.getElementById("room-panel");
  if (!tabs.length || !panel) return;

  var nameEl = panel.querySelector(".room-details__name");
  var descriptionEl = panel.querySelector(".room-description__copy");
  var priceEl = panel.querySelector(".room-details__price");
  var amenitiesEl = panel.querySelector(".amenities");
  var images = [].slice.call(panel.querySelectorAll(".gallery img"));

  /* Copy here is authored in Polish; i18n.t() maps it to the language in
     use. Falls back to the Polish source if i18n.js did not load. */
  function t(value) {
    return window.i18n ? window.i18n.t(value) : value;
  }

  var currentRoom = null;

  function render(key) {
    var room = ROOMS[key];
    if (!room) return;
    currentRoom = key;

    nameEl.textContent = t(room.name);
    if (descriptionEl) descriptionEl.textContent = t(room.description);
    priceEl.textContent = t(room.price);

    amenitiesEl.textContent = "";
    room.amenities.forEach(function (item) {
      var li = document.createElement("li");
      var icon = document.createElement("img");
      icon.src = "assets/icons/" + item.icon + ".svg";
      icon.alt = "";
      icon.width = 16;
      icon.height = 16;
      var label = document.createElement("span");
      label.textContent = t(item.label);
      li.appendChild(icon);
      li.appendChild(label);
      amenitiesEl.appendChild(li);
    });

    images.forEach(function (img, i) {
      var photo = room.photos[i];
      if (!photo) return;
      img.src = photo.src;
      img.alt = t(room.name) + " — " + t(photo.alt);
    });
  }

  function select(tab, moveFocus) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.classList.toggle("chip--active", active);
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    render(tab.getAttribute("data-room"));
    if (moveFocus) tab.focus();
  }

  document.addEventListener("languagechange", function () {
    if (currentRoom) render(currentRoom);
  });

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      select(tab, false);
    });
  });

  /* ---------------------------------------------------------------
     Lightbox: the gallery photos open full size.
     It mirrors whatever the gallery currently shows, so it always
     follows the selected room without tracking its own state.
     --------------------------------------------------------------- */
  var dialog = document.getElementById("lightbox");
  var triggers = [].slice.call(panel.querySelectorAll(".gallery__trigger"));

  if (dialog && typeof dialog.showModal === "function" && triggers.length) {
    var dialogImage = document.getElementById("lightbox-image");
    var counter = document.getElementById("lightbox-counter");
    var index = 0;

    function show(i) {
      index = (i + images.length) % images.length;
      var source = images[index];
      dialogImage.src = source.currentSrc || source.src;
      dialogImage.alt = source.alt;
      counter.textContent = index + 1 + "/" + images.length;
    }

    function open(i) {
      show(i);
      dialog.showModal();
    }

    triggers.forEach(function (trigger, i) {
      trigger.addEventListener("click", function () {
        open(i);
      });
    });

    dialog.querySelector(".lightbox__next").addEventListener("click", function () {
      show(index + 1);
    });
    dialog.querySelector(".lightbox__prev").addEventListener("click", function () {
      show(index - 1);
    });
    dialog.querySelector(".lightbox__close").addEventListener("click", function () {
      dialog.close();
    });

    /* Clicking the empty space around the photo closes it (Esc is native).
       The frame now wraps the photo, so only the sheet and the row around
       it count as empty space. */
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.classList.contains("lightbox__row")) {
        dialog.close();
      }
    });

    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        show(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(index - 1);
      }
    });
  }

  /* Arrow-key navigation, as expected of a tablist */
  document.querySelector(".rooms__filters").addEventListener("keydown", function (e) {
    var i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    var next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next, true);
  });
})();
