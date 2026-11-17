/* Site translation (PL / DE).
 *
 * The page is authored in Polish; Polish IS the key. DICT.de maps each
 * Polish source string to its German counterpart, so adding copy to
 * index.html only requires adding one line here.
 *
 * Two paths keep the page in sync:
 *   1. Static markup — apply() walks text nodes and a short list of
 *      attributes, remembering each node's Polish source so switching
 *      back is lossless.
 *   2. Script-generated content (rooms.js, reviews.js, main.js) — those
 *      modules call i18n.t() and re-render on the "languagechange" event.
 *
 * The choice is kept in localStorage and mirrored into the URL as
 * ?lang=de, so the German page can be linked, shared and crawled.
 */
(function (window, document) {
  "use strict";

  var DEFAULT = "pl";
  var LANGS = ["pl", "de"];
  var STORAGE_KEY = "klaudia-lang";
  var PARAM = "lang";

  /* Attributes worth translating. "content" is only ever matched against
     the dictionary, so <meta name="viewport"> is left alone. */
  var ATTRS = ["aria-label", "placeholder", "alt", "title", "content"];

  var DICT = {
    de: {
      /* --- Head ------------------------------------------------- */
      "Pokoje gościnne Klaudia — Międzywodzie":
        "Gästezimmer Klaudia — Międzywodzie",
      "Pokoje gościnne Klaudia — 350 metrów od plaży w Międzywodziu. Rodzinny pensjonat z prywatnym parkingiem. Ocena gości na Booking.com: 9,2.":
        "Gästezimmer Klaudia — 350 Meter vom Strand in Międzywodzie. Familiäre Pension mit eigenem Parkplatz. Gästebewertung auf Booking.com: 9,2.",

      /* --- Navigation and chrome -------------------------------- */
      Pokoje: "Zimmer",
      "O nas": "Über uns",
      Lokalizacja: "Lage",
      "Dobrze wiedzieć": "Gut zu wissen",
      "Sprawdź dostępność": "Verfügbarkeit prüfen",
      "Skontaktuj się z nami": "Kontaktieren Sie uns",
      "Sprawdź nas na booking.com": "Finden Sie uns auf booking.com",
      "Zmień język": "Sprache ändern",
      "Menu główne": "Hauptmenü",
      "Menu główne (przypięte)": "Hauptmenü (angeheftet)",
      "Menu w stopce": "Menü in der Fußzeile",
      "Pokoje gościnne Klaudia — strona główna":
        "Gästezimmer Klaudia — Startseite",

      /* --- Hero -------------------------------------------------- */
      "Pokoje gościnne Klaudia": "Gästezimmer Klaudia",
      "350 metrów od plaży w Międzywodziu, rodzinny pensjonat z prywatnym parkingiem":
        "350 Meter vom Strand in Międzywodzie, familiäre Pension mit eigenem Parkplatz",
      "Ocena gości na Booking.com: 9,2":
        "Gästebewertung auf Booking.com: 9,2",
      "Nasze pokoje": "Unsere Zimmer",
      "Odtwórz wideo w tle": "Hintergrundvideo abspielen",
      "Zatrzymaj wideo w tle": "Hintergrundvideo anhalten",

      /* --- Reviews ----------------------------------------------- */
      "Co myślą goście?": "Was sagen unsere Gäste?",
      Zatrzymaj: "Anhalten",
      Wznów: "Fortsetzen",
      "Lokalny przewodnik": "Local Guide",
      Gość: "Gast",
      "Ocena: 5 na 5 gwiazdek": "Bewertung: 5 von 5 Sternen",
      "Fajne czyste pokoje, wszędzie blisko, pani Klaudia bardzo miła. Pozdrawiam":
        "Schöne, saubere Zimmer, alles ist in der Nähe, Frau Klaudia ist sehr freundlich. Viele Grüße",
      "Spokojne miejsce kilka minut od plaży. Pokój czysty, gospodarze pomocni i życzliwi.":
        "Ruhiger Ort, nur wenige Minuten vom Strand. Das Zimmer war sauber, die Gastgeber hilfsbereit und freundlich.",
      "Bardzo dobry stosunek jakości do ceny. Parking na miejscu, do centrum i na plażę blisko.":
        "Sehr gutes Preis-Leistungs-Verhältnis. Parkplatz direkt am Haus, bis ins Zentrum und zum Strand ist es nicht weit.",
      "Wracamy tu kolejny sezon. Czysto, cicho, a gospodarze zawsze doradzą, co warto zobaczyć.":
        "Wir kommen schon die nächste Saison wieder. Sauber, ruhig, und die Gastgeber geben immer gute Tipps, was man sich ansehen sollte.",
      "Wygodne łóżka i dobrze wyposażona kuchnia. Świetna baza na rodzinny wypoczynek nad morzem.":
        "Bequeme Betten und eine gut ausgestattete Küche. Ein idealer Ausgangspunkt für einen Familienurlaub an der Ostsee.",
      "Miła atmosfera i zadbany ogród z grillem. Dzieci były zachwycone, na pewno wrócimy.":
        "Angenehme Atmosphäre und ein gepflegter Garten mit Grill. Die Kinder waren begeistert, wir kommen bestimmt wieder.",

      /* --- Rooms -------------------------------------------------- */
      "Typ pokoju": "Zimmertyp",
      Jednoosobowy: "Einzelzimmer",
      Dwuosobowy: "Doppelzimmer",
      Trzyosobowy: "Dreibettzimmer",
      Czteroosobowy: "Vierbettzimmer",
      "Pokój jednoosobowy": "Einzelzimmer",
      "Pokój dwuosobowy": "Doppelzimmer",
      "Pokój trzyosobowy": "Dreibettzimmer",
      "Pokój czteroosobowy": "Vierbettzimmer",
      "Co znajdziesz w tym pokoju?": "Was finden Sie in diesem Zimmer?",
      "1 łóżko": "1 Bett",
      "2 łóżka": "2 Betten",
      "3 łóżka": "3 Betten",
      "4 łóżka": "4 Betten",
      "1 łazienka": "1 Badezimmer",
      Telewizor: "Fernseher",
      "od 180zł / noc": "ab 180 zł / Nacht",
      "od 240zł / noc": "ab 240 zł / Nacht",
      "od 300zł / noc": "ab 300 zł / Nacht",
      "od 360zł / noc": "ab 360 zł / Nacht",
      "Opis pokoju": "Zimmerbeschreibung",
      "Przytulny i komfortowy pokój jednoosobowy, idealny dla osób podróżujących służbowo lub turystycznie. Starannie urządzone wnętrze zapewnia przestrzeń do odpoczynku i relaksu po intensywnym dniu. Pokój wyposażony jest w wygodne łóżko, prywatną łazienkę, telewizor oraz bezpłatny dostęp do Wi-Fi. To doskonały wybór dla osób ceniących wygodę, funkcjonalność i spokojną atmosferę podczas pobytu.":
        "Ein gemütliches und komfortables Einzelzimmer, ideal für Geschäfts- und Urlaubsreisende. Das sorgfältig eingerichtete Interieur bietet Raum, um sich nach einem intensiven Tag auszuruhen und zu entspannen. Das Zimmer verfügt über ein bequemes Bett, ein eigenes Badezimmer, einen Fernseher sowie kostenfreies WLAN. Die richtige Wahl für alle, die Komfort, Funktionalität und eine ruhige Atmosphäre während ihres Aufenthalts schätzen.",
      "Komfortowy pokój dwuosobowy z dwoma łóżkami, prywatną łazienką i telewizorem. Doskonały wybór na wspólny wypoczynek nad morzem, z bezpłatnym dostępem do Wi-Fi i spokojną atmosferą przez cały pobyt.":
        "Ein komfortables Doppelzimmer mit zwei Betten, eigenem Badezimmer und Fernseher. Die richtige Wahl für einen gemeinsamen Urlaub an der Ostsee, mit kostenfreiem WLAN und einer ruhigen Atmosphäre während des gesamten Aufenthalts.",
      "Przestronny pokój trzyosobowy z własną łazienką, telewizorem i miejscem na bagaż. Sprawdzi się zarówno dla rodziny, jak i grupy przyjaciół szukających wygodnej bazy blisko plaży.":
        "Ein geräumiges Dreibettzimmer mit eigenem Badezimmer, Fernseher und Platz für das Gepäck. Geeignet für Familien ebenso wie für Freundesgruppen, die einen bequemen Ausgangspunkt in Strandnähe suchen.",
      "Największy pokój w pensjonacie, przeznaczony dla czterech osób, z prywatną łazienką i telewizorem. Dużo przestrzeni dla rodziny, bezpłatne Wi-Fi i spokojna okolica tuż przy plaży.":
        "Das größte Zimmer der Pension, ausgelegt für vier Personen, mit eigenem Badezimmer und Fernseher. Viel Platz für die Familie, kostenfreies WLAN und eine ruhige Umgebung direkt am Strand.",

      /* --- Gallery ------------------------------------------------ */
      "Galeria zdjęć": "Fotogalerie",
      "Powiększ zdjęcie": "Foto vergrößern",
      "Następne zdjęcie": "Nächstes Foto",
      "Poprzednie zdjęcie": "Vorheriges Foto",
      "Zamknij galerię": "Galerie schließen",
      "widok ogólny": "Gesamtansicht",
      "część wypoczynkowa": "Sitzbereich",
      "widok od strony okna": "Blick aus dem Fenster",
      łóżko: "Bett",
      "wnętrze z telewizorem": "Innenraum mit Fernseher",

      /* --- About -------------------------------------------------- */
      "Od wielu lat działamy w branży turystycznej, oferując naszym gościom komfortowy pobyt i przyjazną atmosferę. Z dumą gościmy zarówno osoby z różnych zakątków Polski, jak i turystów z zagranicy. Wieloletnie doświadczenie pozwoliło nam dobrze poznać potrzeby naszych gości i zdobyć ich zaufanie.":
        "Seit vielen Jahren sind wir in der Tourismusbranche tätig und bieten unseren Gästen einen komfortablen Aufenthalt und eine freundliche Atmosphäre. Mit Freude empfangen wir sowohl Gäste aus allen Teilen Polens als auch Urlauber aus dem Ausland. Unsere langjährige Erfahrung hat uns die Bedürfnisse unserer Gäste gut kennen und ihr Vertrauen gewinnen lassen.",
      "Stawiamy na profesjonalną obsługę, indywidualne podejście oraz najwyższą jakość świadczonych usług. Zależy nam, aby każdy, kto nas odwiedza, czuł się swobodnie i chciał do nas wracać.":
        "Wir setzen auf professionellen Service, eine persönliche Betreuung und höchste Qualität. Uns ist wichtig, dass sich alle, die zu uns kommen, wohlfühlen und gerne wiederkommen.",
      "Gospodarze pensjonatu z dziećmi w ogrodzie":
        "Die Gastgeber der Pension mit ihren Kindern im Garten",

      /* --- Location ----------------------------------------------- */
      "Wyjątkowe miejsce nad bałtykiem": "Ein besonderer Ort an der Ostsee",
      "Międzywodzie to malownicza nadmorska miejscowość położona na wyspie Wolin, między Morzem Bałtyckim a Zalewem Kamieńskim. To idealne miejsce dla osób szukających wypoczynku blisko natury, pięknych plaż i spokojnej atmosfery.":
        "Międzywodzie ist ein malerischer Küstenort auf der Insel Wolin, zwischen der Ostsee und dem Kamieński-Haff. Ein idealer Ort für alle, die Erholung in der Natur, schöne Strände und eine ruhige Atmosphäre suchen.",
      "Plaże, natura i relaks": "Strände, Natur und Erholung",
      "Szerokie, piaszczyste plaże, otaczające miejscowość lasy oraz nadmorski klimat sprawiają, że Międzywodzie jest doskonałym kierunkiem zarówno na rodzinne wakacje, jak i romantyczny wyjazd czy weekendowy odpoczynek.":
        "Breite Sandstrände, die umliegenden Wälder und das Küstenklima machen Międzywodzie zu einem hervorragenden Ziel für den Familienurlaub ebenso wie für eine romantische Reise oder ein erholsames Wochenende.",
      "Wszystko, czego potrzebujesz do wypoczynku":
        "Alles, was Sie für Ihren Urlaub brauchen",
      "Na gości czekają lokalne restauracje, kawiarnie i atrakcje turystyczne. Dzięki swojemu położeniu Międzywodzie pozwala połączyć błogi relaks nad morzem z aktywnym odkrywaniem uroków polskiego wybrzeża.":
        "Auf die Gäste warten lokale Restaurants, Cafés und Sehenswürdigkeiten. Dank seiner Lage lässt sich in Międzywodzie die Erholung am Meer mit dem aktiven Entdecken der polnischen Küste verbinden.",
      "Pokaż trasę": "Route anzeigen",
      "Międzywodzie z lotu ptaka — plaża i zabudowa nad Bałtykiem":
        "Międzywodzie aus der Vogelperspektive — Strand und Bebauung an der Ostsee",

      /* --- Good to know -------------------------------------------- */
      "Praktyczne informacje": "Praktische Informationen",
      Zakwaterowanie: "Unterkunft",
      "Zameldowanie od 15:00, wymeldowanie do 10:00.":
        "Check-in ab 15:00 Uhr, Check-out bis 10:00 Uhr.",
      "Odległość od plaży": "Entfernung zum Strand",
      "Pensjonat znajduje się 300m od plaży.":
        "Die Pension liegt 300 m vom Strand entfernt.",
      Parking: "Parkplatz",
      "Posiadamy prywatny parking dostępny dla naszych gości.":
        "Wir verfügen über einen privaten Parkplatz für unsere Gäste.",
      "Zalew Kamieński": "Kamieński-Haff",
      "500m od Zalewu Kamieńskiego.": "500 m zum Kamieński-Haff.",
      "Miejsce do grillowania": "Grillplatz",
      "Dostępny jest grill na świeżym powietrzu.":
        "Ein Grill im Freien steht zur Verfügung.",
      Udogodnienia: "Ausstattung",
      "Wifi, dostęp do kuchenki, lodówka, ręczniki...":
        "WLAN, Zugang zur Küchenzeile, Kühlschrank, Handtücher …",

      /* --- Contact -------------------------------------------------- */
      "Zadzwoń do nas": "Rufen Sie uns an",
      "Chętnie odpowiemy na wszystkie Twoje pytania dotyczące dostępności pokoi, rezerwacji oraz pobytu w naszym obiekcie. Zadzwoń do nas – pomożemy Ci zaplanować udany wypoczynek nad morzem!":
        "Gerne beantworten wir alle Ihre Fragen zur Verfügbarkeit der Zimmer, zur Reservierung und zu Ihrem Aufenthalt bei uns. Rufen Sie uns an – wir helfen Ihnen, einen gelungenen Urlaub an der Ostsee zu planen!",
      "Adres...": "Adresse …",
      "Albo napisz": "Oder schreiben Sie uns",
      Email: "E-Mail",
      Wiadomość: "Nachricht",
      Wyślij: "Senden",

      /* --- Footer --------------------------------------------------- */
      "© 2026 Pokoje gościnne Klaudia. Wszelkie prawa zastrzeżone.":
        "© 2026 Gästezimmer Klaudia. Alle Rechte vorbehalten."
    }
  };

  /* --- Lookup ---------------------------------------------------- */

  function norm(value) {
    return String(value).replace(/\s+/g, " ").trim();
  }

  /* True when a string is Polish source copy we know how to translate */
  function known(src) {
    for (var i = 0; i < LANGS.length; i++) {
      var table = DICT[LANGS[i]];
      if (table && Object.prototype.hasOwnProperty.call(table, src)) {
        return true;
      }
    }
    return false;
  }

  function translate(src, lang) {
    var table = DICT[lang];
    if (!table) return src;
    return Object.prototype.hasOwnProperty.call(table, src)
      ? table[src]
      : src;
  }

  /* --- Current language ------------------------------------------ */

  function readParam() {
    var match = window.location.search.match(
      new RegExp("[?&]" + PARAM + "=([^&]+)")
    );
    return match ? decodeURIComponent(match[1]).toLowerCase() : null;
  }

  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function valid(lang) {
    return LANGS.indexOf(lang) > -1 ? lang : null;
  }

  var current = valid(readParam()) || valid(readStored()) || DEFAULT;

  /* --- Applying to the static DOM -------------------------------- */

  /* Each translated text node remembers its Polish source, so switching
     back is exact even where two sources share one translation. */
  var ORIGIN = typeof WeakMap === "function" ? new WeakMap() : null;

  function textNodes(root) {
    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentNode;
          if (!parent) return NodeFilter.FILTER_REJECT;
          var tag = parent.nodeName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
            return NodeFilter.FILTER_REJECT;
          }
          return norm(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    var found = [];
    var node;
    while ((node = walker.nextNode())) found.push(node);
    return found;
  }

  function applyText(root, lang) {
    textNodes(root).forEach(function (node) {
      var src = ORIGIN && ORIGIN.has(node) ? ORIGIN.get(node) : null;

      if (src === null) {
        var value = norm(node.nodeValue);
        if (!known(value)) return;
        src = value;
        if (ORIGIN) ORIGIN.set(node, src);
      }

      /* Keep the surrounding whitespace so inline runs stay spaced */
      var lead = node.nodeValue.match(/^\s*/)[0];
      var trail = node.nodeValue.match(/\s*$/)[0];
      node.nodeValue = lead + translate(src, lang) + trail;
    });
  }

  function applyAttrs(root, lang) {
    var selector = ATTRS.map(function (attr) {
      return "[" + attr + "]";
    }).join(",");

    var elements = [].slice.call(root.querySelectorAll(selector));
    if (root.nodeType === 1 && root.matches && root.matches(selector)) {
      elements.unshift(root);
    }

    elements.forEach(function (el) {
      ATTRS.forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;

        var store = "data-i18n-" + attr;
        var src = el.getAttribute(store);

        if (src === null) {
          var value = norm(el.getAttribute(attr));
          if (!known(value)) return;
          src = value;
          el.setAttribute(store, src);
        }

        el.setAttribute(attr, translate(src, lang));
      });
    });
  }

  function apply(root, lang) {
    root = root || document.documentElement;
    lang = lang || current;
    applyText(root, lang);
    applyAttrs(root, lang);
  }

  /* --- Switching -------------------------------------------------- */

  function syncUrl(lang) {
    if (!window.history || !window.history.replaceState) return;

    var url = new URL(window.location.href);
    if (lang === DEFAULT) {
      url.searchParams.delete(PARAM);
    } else {
      url.searchParams.set(PARAM, lang);
    }
    window.history.replaceState(null, "", url.toString());
  }

  function set(lang) {
    lang = valid(lang);
    if (!lang || lang === current) return;

    current = lang;
    i18n.lang = lang;
    document.documentElement.setAttribute("lang", lang);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* Private browsing — the choice just will not survive a reload */
    }

    syncUrl(lang);
    apply(document.documentElement, lang);

    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang: lang } })
    );
  }

  var i18n = {
    lang: current,
    langs: LANGS.slice(),
    "default": DEFAULT,
    t: function (src) {
      return translate(norm(src), current);
    },
    apply: apply,
    set: set
  };

  window.i18n = i18n;

  /* The initial pass waits for DOMContentLoaded so it also covers nodes
     the other end-of-body scripts have built by then (the marquee clone,
     the rendered room panel). */
  document.documentElement.setAttribute("lang", current);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      apply(document.documentElement, current);
    });
  } else {
    apply(document.documentElement, current);
  }
})(window, document);
