// Small enhancements for nachols.com. Every page works without this file.
(function () {
	var lang = document.documentElement.lang;

	function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
	function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

	// ---- Light/dark toggle --------------------------------------------------
	// The saved theme is applied by an inline snippet in <head> (to avoid a flash);
	// here we only wire up the button.
	var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
	var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
	var LABELS = {
		en: { dark: 'Switch to dark mode', light: 'Switch to light mode' },
		es: { dark: 'Cambiar a modo oscuro', light: 'Cambiar a modo claro' }
	}[lang] || { dark: 'Switch to dark mode', light: 'Switch to light mode' };

	var toggle = document.getElementById('theme-toggle');
	var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

	function current() {
		return document.documentElement.dataset.theme || (systemDark && systemDark.matches ? 'dark' : 'light');
	}
	function render() {
		var next = current() === 'dark' ? 'light' : 'dark';
		toggle.innerHTML = next === 'dark' ? MOON : SUN;
		toggle.setAttribute('aria-label', LABELS[next]);
		toggle.title = LABELS[next];
	}
	if (toggle) {
		toggle.addEventListener('click', function () {
			var next = current() === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = next;
			set('theme', next);
			render();
		});
		if (systemDark && systemDark.addEventListener) systemDark.addEventListener('change', render);
		render();
		toggle.hidden = false;
	}

	// ---- Language hint ------------------------------------------------------
	// Offers the other language when the browser prefers it. Never redirects.
	// The counterpart URL comes from the page's <link rel="alternate" hreflang> tags.
	var KEY = 'lang-choice';
	document.querySelectorAll('[data-set-lang]').forEach(function (a) {
		a.addEventListener('click', function () { set(KEY, a.getAttribute('data-set-lang')); });
	});

	var hint = document.getElementById('lang-hint');
	if (!hint || get(KEY)) return;

	var browser = ((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase();
	if (browser === lang) return;
	var alt = document.querySelector('link[rel="alternate"][hreflang="' + browser + '"]');
	if (!alt) return;

	var link = hint.querySelector('a');
	link.href = alt.getAttribute('href');
	link.addEventListener('click', function () { set(KEY, browser); });
	hint.querySelector('button').addEventListener('click', function () {
		set(KEY, lang);
		hint.hidden = true;
	});
	hint.hidden = false;
})();
