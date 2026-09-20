/*
 * Site-specific JavaScript.
 *
 * Loaded after assets/main.js, which is compiled webpack output (GSAP +
 * ScrollTrigger) with no source project in this repo. Do not edit main.js.
 * Put customisations and new behaviour here instead.
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Add site behaviour here.
  });
})();
