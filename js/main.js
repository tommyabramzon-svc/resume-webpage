/* Reveal on scroll · active-nav highlighting · sticky-nav shadow · mobile menu */
(function () {
  "use strict";

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Nav shadow on scroll ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) { nav.classList.toggle("scrolled", window.scrollY > 24); }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Active nav link based on section in view ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var linksWrap = document.querySelector(".nav-links");
  if (toggle && linksWrap) {
    toggle.addEventListener("click", function () {
      var open = linksWrap.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    linksWrap.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        linksWrap.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
