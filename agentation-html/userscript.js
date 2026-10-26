// ==UserScript==
// @name         Agentation Localhost Auto-Inject
// @namespace    https://agentation.local
// @version      1.0.0
// @description  Automatically loads Agentation visual feedback on all localhost ports and dev servers
// @author       Project Sutra
// @match        http://localhost:*/*
// @match        http://127.0.0.1:*/*
// @match        http://0.0.0.0:*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  // Prevent double loading
  if (window.__AGENTATION_INITIALIZED__) return;

  // Option A: Load from a local dev server or CDN
  // const script = document.createElement('script');
  // script.src = 'http://localhost:8085/agentation.js';
  // document.head.appendChild(script);

  // Option B: Inline injection (Works 100% offline with zero dependencies)
  // Copy and paste the contents of agentation.js below to create a fully standalone Userscript:
  const script = document.createElement('script');
  script.src = 'http://localhost:8085/agentation.js';
  script.onerror = function() {
    console.info('[Agentation Userscript] Could not fetch external script. You can inline agentation.js in your Tampermonkey editor.');
  };
  document.head.appendChild(script);

})();
