/**
 * Agentation for HTML — Browser Bookmarklet
 * 
 * Instructions:
 * 1. Create a new bookmark in your browser (e.g. named "🎯 Agentation").
 * 2. In the "URL" or "Location" field, paste the one-line code below.
 * 3. Whenever you are on any webpage or localhost dev server, click the bookmark to launch Agentation!
 */

// ============================================================================
// ONE-LINE BOOKMARKLET (Copy & paste this into your browser bookmark URL field)
// ============================================================================

javascript:(function(){if(window.__AGENTATION_INITIALIZED__){if(window.Agentation)window.Agentation.toggleInspect();return;}var s=document.createElement('script');s.src='http://localhost:8085/agentation.js';document.body.appendChild(s);})();

// ============================================================================
// READABLE SOURCE CODE EXPLANATION:
// ============================================================================
/*
(function () {
  // If Agentation is already loaded on the page, toggle Comment Mode
  if (window.__AGENTATION_INITIALIZED__) {
    if (window.Agentation && typeof window.Agentation.toggleInspect === 'function') {
      window.Agentation.toggleInspect();
    }
    return;
  }

  // Otherwise dynamically inject the script
  const script = document.createElement('script');
  // NOTE: Replace with your actual hosted URL or local dev server path:
  script.src = 'http://localhost:8085/agentation.js';
  script.onload = function () {
    console.log('[Agentation] Loaded successfully via Bookmarklet.');
  };
  script.onerror = function () {
    alert('Failed to load Agentation. Ensure the script URL is reachable.');
  };
  document.body.appendChild(script);
})();
*/
