# 🚀 Agentation for HTML — Integration Guide

This guide details how to integrate and run `agentation.js` across various project architectures and environments.

---

## Table of Contents
1. [Chrome DevTools Snippet (Zero Code Modification)](#1-chrome-devtools-snippet-zero-code-modification)
2. [Tampermonkey Userscript (Automated for ALL Localhost Projects)](#2-tampermonkey-userscript-automated-for-all-localhost-projects)
3. [Static HTML & Vanilla Websites](#3-static-html--vanilla-websites)
4. [Vite (React, Vue, Svelte, Vanilla)](#4-vite-react-vue-svelte-vanilla)
5. [Next.js (App Router & Pages Router)](#5-nextjs-app-router--pages-router)
6. [Backend Frameworks (Django, Flask, Rails, Laravel, PHP)](#6-backend-frameworks-django-flask-rails-laravel-php)
7. [CDN / GitHub Pages Linking](#7-cdn--github-pages-linking)

---

## 1. Chrome DevTools Snippet (Zero Code Modification)

**Best for**: When you want to inspect and comment on any website, staging environment, or client app without modifying any source files.

1. Open your browser DevTools (<kbd>F12</kbd> or <kbd>Ctrl + Shift + I</kbd> / <kbd>Cmd + Option + I</kbd>).
2. Go to the **Sources** tab.
3. In the left panel, find **Snippets** (click `>>` if hidden).
4. Click **+ New snippet** and name it `Agentation`.
5. Copy the entire contents of [`agentation.js`](agentation.js) and paste it into the editor.
6. Press <kbd>Ctrl + Enter</kbd> (or <kbd>Cmd + Enter</kbd>) to run it.

> **Shortcut Tip**: On any web page, press <kbd>Ctrl + P</kbd> (or <kbd>Cmd + P</kbd>) inside DevTools, type `!Agentation`, and hit Enter!

---

## 2. Tampermonkey Userscript (Automated for ALL Localhost Projects)

**Best for**: Developers who want Agentation to automatically load whenever they run *any* project on `localhost:*` or `127.0.0.1:*`.

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Click the extension icon and select **Create a new script**.
3. Replace the content with the script in [`userscript.js`](userscript.js):

```javascript
// ==UserScript==
// @name         Agentation Localhost Auto-Inject
// @namespace    https://agentation.local
// @version      1.0
// @description  Automatically loads Agentation visual feedback on all localhost ports
// @match        http://localhost:*/*
// @match        http://127.0.0.1:*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Check if already injected
  if (window.__AGENTATION_INITIALIZED__) return;

  const script = document.createElement('script');
  // Point to a local server or paste the full agentation.js script content
  script.src = 'http://localhost:8085/agentation.js';
  document.head.appendChild(script);
})();
```
4. Save the script (<kbd>Ctrl + S</kbd>). Now any local web page will load Agentation automatically!

---

## 3. Static HTML & Vanilla Websites

Copy `agentation.js` into your project's script folder (e.g., `js/agentation.js`), then add a script tag before `</body>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <!-- Your content -->

  <!-- Load Agentation -->
  <script src="js/agentation.js"></script>
</body>
</html>
```

---

## 4. Vite (React, Vue, Svelte, Vanilla)

In a Vite project, place `agentation.js` inside your `public/` folder so it is served statically:

```
my-vite-app/
├── public/
│   └── agentation.js
├── src/
└── index.html
```

In `index.html`, add conditional loading so it only runs during development:

```html
<!-- Inside index.html -->
<script type="module">
  if (import.meta.env.DEV) {
    const script = document.createElement('script');
    script.src = '/agentation.js';
    document.body.appendChild(script);
  }
</script>
```

---

## 5. Next.js (App Router & Pages Router)

Place `agentation.js` in your `public/` directory:

```
my-next-app/
├── public/
│   └── agentation.js
├── app/
│   └── layout.tsx
```

### App Router (`app/layout.tsx`):
```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <Script src="/agentation.js" strategy="lazyOnload" />
        )}
      </body>
    </html>
  );
}
```

### Pages Router (`pages/_app.tsx`):
```tsx
import Script from 'next/script';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'development' && (
        <Script src="/agentation.js" strategy="lazyOnload" />
      )}
    </>
  );
}
```

---

## 6. Backend Frameworks (Django, Flask, Rails, Laravel, PHP)

### Django / Flask / Jinja:
In your base template (e.g., `base.html`):
```html
{% if debug %}
  <script src="{{ url_for('static', filename='js/agentation.js') }}"></script>
{% endif %}
```

### Laravel Blade:
In `resources/views/layouts/app.blade.php`:
```html
@if (app()->environment('local'))
  <script src="{{ asset('js/agentation.js') }}"></script>
@endif
```

### Rails ERB:
In `app/views/layouts/application.html.erb`:
```html
<% if Rails.env.development? %>
  <%= javascript_include_tag "agentation" %>
<% end %>
```

---

## 7. CDN / GitHub Pages Linking

If you host `agentation.js` on a GitHub repository or static storage bucket, you can include it via jsDelivr CDN without storing the file locally:

```html
<script src="https://cdn.jsdelivr.net/gh/<username>/<repo>@main/agentation-html/agentation.js"></script>
```
