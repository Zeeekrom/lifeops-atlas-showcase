import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("demo data is explicitly synthetic and covers all product views", async () => {
  const data = JSON.parse(await readFile(new URL("../demo/data.json", import.meta.url), "utf8"));
  assert.equal(data.synthetic, true);
  for (const key of ["todayKpis", "agenda", "actions", "modules", "coverage", "people", "reviews"]) {
    assert.ok(Array.isArray(data[key]) && data[key].length > 0, `${key} should contain synthetic examples`);
  }
});

test("README states the private/public boundary", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /sanitised portfolio edition/i);
  assert.match(readme, /personal data/i);
  assert.match(readme, /does not\s+share Git history/i);
});

test("English and Chinese READMEs link to each other", async () => {
  const english = await readFile(new URL("../README.md", import.meta.url), "utf8");
  const chinese = await readFile(new URL("../README.zh-CN.md", import.meta.url), "utf8");
  assert.match(english, /href="README\.zh-CN\.md">简体中文<\/a>/);
  assert.match(chinese, /href="README\.md">English<\/a>/);
  assert.match(chinese, /合成数据/);
  assert.match(chinese, /公开版与私有版边界/);
});

test("READMEs publish the same privacy-safe operating snapshot", async () => {
  const english = await readFile(new URL("../README.md", import.meta.url), "utf8");
  const chinese = await readFile(new URL("../README.zh-CN.md", import.meta.url), "utf8");
  assert.match(english, /Real-world operating snapshot/);
  assert.match(english, /Snapshot captured 8 Oct 2026/);
  assert.match(english, /no live connection to the private/);
  assert.match(chinese, /真实使用规模/);
  assert.match(chinese, /2026 年 10 月 8 日/);
  assert.match(chinese, /不会实时连接私人生产数据库/);
});
