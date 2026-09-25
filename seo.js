(function () {
  'use strict';

  var path = window.location.pathname.replace(/\\/g, '/');
  var root = path.indexOf('/ricepuritytest/') !== -1 ? '/ricepuritytest/' : '/';
  var cleanPath = path.replace(/^\/ricepuritytest/, '').replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  var requestedPath = cleanPath;
  cleanPath = cleanPath.replace(/\.html$/, '');
  var pages = {
    '/': {
      title: 'Rice Purity Test & Rice Purity Score Quiz',
      description: 'Take the Rice Purity Test online and calculate your Rice Purity Score from 100 questions. Compare your result privately and share it. Take the test now!'
    },
    '/about-us': { title: 'About Rice Purity Test Scores', description: 'Learn who created Rice Purity Scores, why the Rice Purity Test exists, and how we protect visitors. Meet the team and read our story today.' },
    '/contact-us': { title: 'Contact Rice Purity Scores Team', description: 'Contact the Rice Purity Scores team with feedback, questions, or partnership requests about our online Rice Purity Test. Send us a message today.' },
    '/privacy-policy': { title: 'Rice Purity Test Privacy Policy', description: 'Read the Rice Purity Scores privacy policy to learn how browser-based quiz answers, analytics, and contact information are handled. Review it now.' },
    '/terms-and-conditions': { title: 'Rice Purity Test Terms and Conditions', description: 'Review the terms for using Rice Purity Scores, including quiz rules, acceptable use, content ownership, and the entertainment disclaimer. Read now.' },
    '/blog': { title: 'Rice Purity Test Blog and Score Guides', description: 'Explore Rice Purity Test score guides, history, age benchmarks, FAQs, and edition comparisons in clear, practical articles. Find your guide now.' },
    '/blog/faq': { title: 'Rice Purity Test FAQ and Answers', description: 'Get clear answers about the Rice Purity Test, score calculation, privacy, editions, and results. Read the complete FAQ and take the test now.' },
    '/blog/history-of-the-test': { title: 'Rice Purity Test History and Origins', description: 'Discover the history and origins of the Rice Purity Test, from its Rice University roots to today’s online purity quiz. Read the story now.' },
    '/blog/rice-purity-test-score-meaning': { title: 'Rice Purity Test Score Meaning Chart', description: 'Use this Rice Purity Test score meaning chart to understand every range from 0 to 100, compare benchmarks, and interpret your result. Check it now.' },
    '/blog/average-rice-purity-score': { title: 'Average Rice Purity Score by Age', description: 'Explore average Rice Purity Test scores by age, education, and country, with careful context for online benchmarks. Compare your score now.' },
    '/blog/rice-purity-test-girls-college-edition': { title: 'Rice Purity Test for Girls and College', description: 'Learn how the Rice Purity Test works for girls and college students, including campus milestones, privacy, and edition differences. Read the guide now.' },
    '/blog/rice-purity-test-vs-purity-test': { title: 'Rice Purity Test vs Purity Test', description: 'Compare the Rice Purity Test with generic purity quizzes by origins, questions, scoring, privacy, and purpose. Read the key differences now.' }
  };
  var legacy = {
    '/blog/score-meaning-guide.html': '/blog/rice-purity-test-score-meaning/',
    '/blog/average-rice-purity-score-by-age.html': '/blog/average-rice-purity-score/',
    '/blog/rice-purity-test-college-edition.html': '/blog/rice-purity-test-girls-college-edition/',
    '/blog/rice-purity-test-girls.html': '/blog/rice-purity-test-girls-college-edition/',
    '/blog/rice-vs-purity-test.html': '/blog/rice-purity-test-vs-purity-test/'
  };
  if (legacy[requestedPath]) {
    window.location.replace(root + legacy[requestedPath].replace(/^\//, ''));
    return;
  }
  var current = pages[cleanPath] || pages['/'];
  var canonicalPath = cleanPath + (cleanPath === '/' ? '' : '/');
  var canonical = 'https://ricepurityscores.com' + canonicalPath;

  document.title = current.title;
  function setMeta(name, content, attribute) {
    var selector = attribute ? 'meta[' + attribute + '="' + name + '"]' : 'meta[name="' + name + '"]';
    var tag = document.head.querySelector(selector);
    if (!tag) { tag = document.createElement('meta'); if (attribute) tag.setAttribute(attribute, name); else tag.name = name; document.head.appendChild(tag); }
    tag.content = content;
  }
  setMeta('description', current.description);
  setMeta('og:title', current.title, 'property');
  setMeta('og:description', current.description, 'property');
  setMeta('og:url', canonical, 'property');
  setMeta('twitter:title', current.title);
  setMeta('twitter:description', current.description);
  var link = document.head.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement('link'));
  link.rel = 'canonical'; link.href = canonical;

  var heading = document.querySelector('h1');
  if (!heading) {
    heading = document.createElement('h1');
    heading.textContent = current.title;
    var main = document.querySelector('main') || document.body;
    main.insertBefore(heading, main.firstChild);
  }
  document.querySelectorAll('img:not([alt])').forEach(function (image) { image.alt = 'Rice Purity Test score guide'; });

  var existing = document.querySelector('.seo-runtime-footer');
  if (existing) return;
  var footer = document.createElement('section');
  footer.className = 'seo-runtime-footer';
  footer.innerHTML = '<nav aria-label="Breadcrumb"><a href="' + root + '">Home</a> <span aria-hidden="true">/</span> <a href="' + root + 'blog/">Rice Purity Test Guides</a> <span aria-hidden="true">/</span> <span>' + current.title + '</span></nav>' +
    '<p><strong>Last updated:</strong> September 2026. This Rice Purity Test is for entertainment and self-reflection only; it is not a medical, psychological, or moral assessment.</p>' +
    '<h2>Related Rice Purity Test Guides</h2><p><a href="' + root + '">Take the Rice Purity Test</a> · <a href="' + root + 'blog/rice-purity-test-score-meaning/">Rice Purity score meaning chart</a> · <a href="' + root + 'blog/average-rice-purity-score/">Average score by age</a> · <a href="' + root + 'blog/faq.html">Rice Purity Test FAQ</a></p>';
  document.body.appendChild(footer);

  var style = document.createElement('style');
  style.textContent = '.seo-runtime-footer{max-width:1000px;margin:32px auto;padding:20px;border-top:2px solid #7a1f1f;color:#381313;line-height:1.6}.seo-runtime-footer nav{font-size:.9rem;margin-bottom:12px}.seo-runtime-footer h2{font-size:1.25rem;margin:12px 0 4px}.seo-runtime-footer a{color:#7a1f1f;font-weight:700}.seo-runtime-footer p{margin:8px 0}@media(max-width:700px){.seo-runtime-footer{margin:24px 16px}}';
  document.head.appendChild(style);

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ricepurityscores.com/' },
    { '@type': 'ListItem', position: 2, name: 'Rice Purity Test Guides', item: 'https://ricepurityscores.com/blog/' },
    { '@type': 'ListItem', position: 3, name: current.title, item: canonical }
  ] });
  document.head.appendChild(script);
}());
