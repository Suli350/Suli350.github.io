/* ================= i18n: language switch (EN / DE / AR) ================= */
(function () {
  var KEY = 'sa_site_lang';
  var SUPPORTED = ['en', 'de', 'ar'];

  function getSavedLang() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    return SUPPORTED.indexOf(saved) !== -1 ? saved : 'en';
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('data-lang', lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}

    // Swap image alt text
    var imgs = document.querySelectorAll('[data-alt-en]');
    for (var i = 0; i < imgs.length; i++) {
      var el = imgs[i];
      var v = el.getAttribute('data-alt-' + lang) || el.getAttribute('data-alt-en');
      el.setAttribute('alt', v);
    }

    // Swap document title
    var titleEl = document.querySelector('title[data-title-en]');
    if (titleEl) {
      var t = titleEl.getAttribute('data-title-' + lang) || titleEl.getAttribute('data-title-en');
      titleEl.textContent = t;
    }

    // Update switch button active state
    var btns = document.querySelectorAll('[data-lang-btn]');
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      if (b.getAttribute('data-lang-btn') === lang) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-lang-btn]') : null;
    if (btn) {
      applyLang(btn.getAttribute('data-lang-btn'));
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getSavedLang());
  });

  // In case this script runs after DOMContentLoaded already fired (defer should prevent this, but just in case)
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    applyLang(getSavedLang());
  }
})();
