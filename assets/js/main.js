(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav__toggle");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!body.classList.contains("nav-open")) return;
      if (e.target.closest(".nav__links") || e.target.closest(".nav__toggle")) return;
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Scroll reveal (IntersectionObserver fallback for browsers without animation-timeline) ---
  var supportsScrollTimeline = CSS.supports("animation-timeline: view()");
  if (!supportsScrollTimeline && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // --- Highlight today's row in the opening-hours table ---
  var hoursRows = document.querySelectorAll(".hours-row");
  if (hoursRows.length) {
    var today = new Date().getDay(); // 0 = Sunday
    hoursRows.forEach(function (row) {
      if (parseInt(row.getAttribute("data-day"), 10) === today) {
        row.classList.add("hours-row--today");
      }
    });
  }
})();
