import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const read = name => readFile(new URL('../' + name, import.meta.url), 'utf8');
test('every public entry links bilingual copyright and terms, including the film', async () => {
  for (const name of ['demo/index.html', 'demo/video/index.html', 'demo/terms/index.html']) {
    const html = await read(name);
    assert.match(html, /id="atlas-legal-footer"/); assert.match(html, /保留所有权利/); assert.match(html, /All rights reserved/);
    assert.match(html, /legal\.js/); assert.match(html, /legal\.css/);
  }
  const terms = await read('demo/terms/index.html');
  for (const id of ['copyright', 'use', 'third-party', 'privacy']) assert.match(terms, new RegExp('id="' + id + '"'));
  for (const text of ['未经律师审阅', 'not reviewed by a lawyer', 'soundtrack', '配乐', 'IP', 'localStorage', 'sessionStorage', 'GitHub']) assert.ok(terms.includes(text));
});
test('public legal code preserves a storage-free demo and third-party rights', async () => {
  const js = await read('demo/legal.js');
  assert.doesNotMatch(js, /localStorage|sessionStorage|document\.cookie|fetch\(/);
  assert.match(js, /document\.currentScript\.src/); // Correct base under a Pages project path.
  assert.match(await read('LICENSE'), /Copyright \(c\) 2026 LifeOps Atlas\. All rights reserved\./);
  assert.equal(await read('demo/third-party-notices.txt'), await read('THIRD_PARTY_NOTICES.md'));
  assert.match(await read('THIRD_PARTY_NOTICES.md'), /not yet\s+documented/);
});
test('crawler candidates separate production and preview without claiming a project-path file is effective', async () => {
  const scoped = await read('deployment/robots.github-pages-root.txt');
  for (const agent of ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended']) assert.ok(scoped.includes('User-agent: ' + agent));
  assert.match(scoped, /Disallow: \/lifeops-atlas-showcase\//);
  assert.match(scoped, /User-agent: \*\nAllow: \/lifeops-atlas-showcase\//);
  assert.match(await read('deployment/robots.preview.txt'), /User-agent: \*\nDisallow: \//);
  assert.match(await read('docs/copyright-and-privacy.md'), /not active controls/);
});

test('legal links retain the deployed project prefix and language without browser storage', async () => {
  const source = await read('demo/legal.js');
  for (const base of ['https://example.test/', 'https://example.test/lifeops-atlas-showcase/']) {
    const terms = { dataset: { legal: 'terms' } }, privacy = { dataset: { legal: 'privacy' } };
    const document = { currentScript: { src: base + 'legal.js' }, body: { classList: { contains: () => false } }, documentElement: { lang: 'zh-CN' }, querySelectorAll: () => [terms, privacy], getElementById: () => null };
    vm.runInNewContext(source, { document, URL, URLSearchParams, location: { search: '' }, MutationObserver: class { observe() {} } });
    assert.equal(terms.href, base + 'terms/?lang=zh');
    assert.equal(privacy.href, base + 'terms/?lang=zh#privacy');
  }
});
