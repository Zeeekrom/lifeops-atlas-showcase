(() => {
  const root = new URL('./', document.currentScript.src);
  const page = document.body.classList.contains('atlas-legal-page');
  const requested = new URLSearchParams(location.search).get('lang');
  if (page && ['zh', 'en'].includes(requested)) document.documentElement.lang = requested === 'zh' ? 'zh-CN' : 'en';
  const sync = () => {
    const english = document.documentElement.lang.startsWith('en'), language = english ? 'en' : 'zh';
    document.querySelectorAll('[data-legal]').forEach(link => {
      link.href = new URL('terms/?lang=' + language + (link.dataset.legal === 'privacy' ? '#privacy' : ''), root).href;
    });
    const button = document.getElementById('legal-language');
    if (button) button.textContent = english ? '中文' : 'English';
    if (page) {
      document.title = english ? 'Terms, licences and privacy · LifeOps Atlas' : '条款、许可与隐私 · LifeOps Atlas';
      document.querySelectorAll('[data-legal-language]').forEach(block => { block.hidden = block.dataset.legalLanguage !== language; });
    }
  };
  document.getElementById('legal-language')?.addEventListener('click', () => {
    const language = document.documentElement.lang.startsWith('en') ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url); sync();
  });
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  sync();
})();
