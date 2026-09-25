// Shared Language Switcher and Floating CTA Button logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Styles for the Floating Button
  injectGlobalStyles();

  // 2. Initialize Language Dropdown Handler
  initLanguageSwitcher();

  // 3. Inject Floating "Take Rice Purity Test" Button on Subpages
  injectFloatingCtaButton();
});

// Supported language codes
const SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'it', 'tr', 'ru'];

// RTL languages
const RTL_LANGS = ['ar'];

// Dynamic Injection of Global CSS Styles
function injectGlobalStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    /* Floating CTA Button Styles */
    .floating-cta-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 1000;
      background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); /* Premium Royal Blue Gradient */
      color: #ffffff !important;
      text-decoration: none;
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 0.88rem;
      letter-spacing: 0.8px;
      padding: 14px 24px;
      border-radius: 50px;
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      display: flex;
      align-items: center;
      gap: 10px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.95);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .floating-cta-btn.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    .floating-cta-btn:hover {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0 10px 28px rgba(59, 130, 246, 0.6);
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    }
    .floating-cta-btn:active {
      transform: translateY(-1px) scale(0.98);
    }
    .floating-cta-btn svg {
      transition: transform 0.2s ease;
    }
    .floating-cta-btn:hover svg {
      transform: translateX(4px);
    }
    
    /* RTL adjustments for floating button */
    [dir="rtl"] .floating-cta-btn {
      right: auto;
      left: 28px;
    }
    [dir="rtl"] .floating-cta-btn:hover svg {
      transform: translateX(-4px);
    }
    
    @media (max-width: 580px) {
      .floating-cta-btn {
        bottom: 20px;
        right: 20px;
        padding: 10px 18px;
        font-size: 0.78rem;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
      }
      [dir="rtl"] .floating-cta-btn {
        right: auto;
        left: 20px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Injects the Floating Button
function injectFloatingCtaButton() {
  const isHomepage = !!document.getElementById('tabStandard');
  if (isHomepage) return; // Do NOT inject on homepage

  // Resolve path depth
  let homeLink = '../index.html';
  const pathname = window.location.pathname;
  if (pathname.includes('/blog/rice-purity-test-score-meaning/')) {
    homeLink = '../../index.html';
  } else if (!pathname.includes('/about-us/') && !pathname.includes('/blog/') && !pathname.includes('/contact-us/') && !pathname.includes('/privacy-policy/') && !pathname.includes('/terms-and-conditions/')) {
    homeLink = 'index.html';
  }

  // Create Button
  const btn = document.createElement('a');
  btn.href = homeLink;
  btn.className = 'floating-cta-btn';
  btn.id = 'floatingCtaBtn';
  btn.innerHTML = `
    <span data-i18n="floatingCtaText">Take Rice Purity Test</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  `;
  document.body.appendChild(btn);

  // Scroll Listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

// Detect user's preferred language from browser settings
function detectBrowserLanguage() {
  const languages = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
  
  for (let i = 0; i < languages.length; i++) {
    const browserLang = languages[i].toLowerCase();
    // Try exact match first (e.g., 'pt-br' -> 'pt')
    const langCode = browserLang.split('-')[0];
    if (SUPPORTED_LANGS.indexOf(langCode) !== -1) {
      return langCode;
    }
  }
  return 'en';
}

// Apply RTL/LTR direction based on language
function applyTextDirection(lang) {
  const htmlEl = document.documentElement;
  if (RTL_LANGS.indexOf(lang) !== -1) {
    htmlEl.setAttribute('dir', 'rtl');
  } else {
    htmlEl.setAttribute('dir', 'ltr');
  }
  htmlEl.setAttribute('lang', lang);
}

// Initial Language Settings and Dropdown setup
function initLanguageSwitcher() {
  const langSelect = document.getElementById('langSelect');
  if (!langSelect) return;

  // Determine language: saved > auto-detect > english
  let savedLang = localStorage.getItem('lang');
  
  if (!savedLang) {
    // First visit — auto-detect browser language
    savedLang = detectBrowserLanguage();
    localStorage.setItem('lang', savedLang);
  }

  langSelect.value = savedLang;
  
  // Apply text direction immediately
  applyTextDirection(savedLang);

  // Apply saved language if not English
  if (savedLang !== 'en') {
    loadLanguage(savedLang);
  }

  langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('lang', selectedLang);
    applyTextDirection(selectedLang);
    
    loadLanguage(selectedLang);
  });
}

// Resolves path prefix based on current page depth
function getPathPrefix() {
  const pathname = window.location.pathname;
  if (pathname.includes('/blog/rice-purity-test-score-meaning/')) {
    return '../../';
  } else if (pathname.includes('/blog/') || pathname.includes('/about-us/') || pathname.includes('/contact-us/') || pathname.includes('/privacy-policy/') || pathname.includes('/terms-and-conditions/')) {
    return '../';
  }
  return '';
}

// Loads translation dictionary dynamically
function loadLanguage(lang) {
  if (lang === 'en') {
    applyTranslations(lang);
    return;
  }
  const scriptId = 'lang-script-' + lang;
  if (document.getElementById(scriptId)) {
    applyTranslations(lang);
    return;
  }

  const prefix = getPathPrefix();

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = prefix + 'lang/' + lang + '.js';
  script.onload = () => {
    applyTranslations(lang);
  };
  script.onerror = () => {
    console.error('Failed to load language script: ' + script.src);
  };
  document.body.appendChild(script);
}

// Applies the translated terms to DOM nodes
function applyTranslations(lang) {
  const dict = lang === 'en' ? {} : window['i18nDict_' + lang];
  if (lang !== 'en' && !dict) return;

  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!el.hasAttribute('data-original-html')) {
      el.setAttribute('data-original-html', el.innerHTML);
    }
    
    if (lang === 'en') {
      el.innerHTML = el.getAttribute('data-original-html');
    } else if (dict[key]) {
      if (dict[key].indexOf('<') !== -1) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Translate common elements using direct text matching
  const tagsToTranslate = ['a', 'h1', 'h2', 'h3', 'h4', 'p', 'li', 'label', 'button', 'span', 'strong', 'option', 'th', 'td'];
  tagsToTranslate.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      if (el.children.length === 0 || (tag === 'a' && el.querySelector('svg') === null && el.querySelector('span') === null)) {
        if (!el.hasAttribute('data-original-text')) {
          el.setAttribute('data-original-text', el.textContent.trim());
        }
        
        const originalText = el.getAttribute('data-original-text');
        if (lang === 'en') {
          el.textContent = originalText;
        } else if (dict[originalText]) {
          el.textContent = dict[originalText];
        }
      }
    });
  });

  // Translate placeholder attributes
  document.querySelectorAll('[placeholder]').forEach(el => {
    if (!el.hasAttribute('data-original-placeholder')) {
      el.setAttribute('data-original-placeholder', el.getAttribute('placeholder').trim());
    }
    
    const originalPlaceholder = el.getAttribute('data-original-placeholder');
    if (lang === 'en') {
      el.setAttribute('placeholder', originalPlaceholder);
    } else if (dict[originalPlaceholder]) {
      el.setAttribute('placeholder', dict[originalPlaceholder]);
    }
  });

  // Update page title
  if (!document.documentElement.hasAttribute('data-original-title')) {
    document.documentElement.setAttribute('data-original-title', document.title);
  }
  if (lang === 'en') {
    document.title = document.documentElement.getAttribute('data-original-title');
  } else if (dict['_pageTitle']) {
    document.title = dict['_pageTitle'];
  }

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    if (!metaDesc.hasAttribute('data-original-content')) {
      metaDesc.setAttribute('data-original-content', metaDesc.getAttribute('content'));
    }
    if (lang === 'en') {
      metaDesc.setAttribute('content', metaDesc.getAttribute('data-original-content'));
    } else if (dict['_metaDescription']) {
      metaDesc.setAttribute('content', dict['_metaDescription']);
    }
  }

  // Trigger page-specific hook if it exists
  if (typeof window.onLanguageChange === 'function') {
    window.onLanguageChange(lang);
  }
}
