// Offers the other language when the visitor's browser prefers it. Never redirects.
// The counterpart URL comes from the page's <link rel="alternate" hreflang> tags.
(function () {
	var KEY = 'lang-choice';
	var pageLang = document.documentElement.lang;
	var hint = document.getElementById('lang-hint');
	if (!hint) return;

	function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
	function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

	// Using the header switch counts as an explicit choice.
	document.querySelectorAll('[data-set-lang]').forEach(function (a) {
		a.addEventListener('click', function () { set(a.getAttribute('data-set-lang')); });
	});

	if (get()) return;

	var browser = ((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase();
	if (browser === pageLang) return;

	var alt = document.querySelector('link[rel="alternate"][hreflang="' + browser + '"]');
	if (!alt) return;

	hint.querySelector('a').href = alt.getAttribute('href');
	hint.querySelector('a').setAttribute('data-set-lang', browser);
	hint.querySelector('a').addEventListener('click', function () { set(browser); });
	hint.querySelector('button').addEventListener('click', function () {
		set(pageLang);
		hint.hidden = true;
	});
	hint.hidden = false;
})();
