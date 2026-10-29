import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateSnapshot } from "../scripts/validate-snapshot.mjs";

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
  assert.match(readme, /personal\s+data/i);
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
  assert.match(english, /Dated operating and verification snapshot/);
  assert.match(english, /29 Oct 2026/);
  assert.match(english, /no live connection to the private/);
  assert.match(chinese, /注明日期的运行与验收快照/);
  assert.match(chinese, /2026 年 10 月 29 日/);
  assert.match(chinese, /不会实时连接私人生产数据库/);
  const snapshot = JSON.parse(await readFile(new URL("../docs/operating-snapshot.json", import.meta.url), "utf8"));
  for (const content of [english, chinese]) {
    assert.ok(content.includes(`<strong>${snapshot.knowledge.documents}</strong>`));
    assert.ok(content.includes(`<strong>${snapshot.historyImport.sourceRecords}</strong>`));
    assert.ok(content.includes(`<strong>${snapshot.verification.suitePassed} / ${snapshot.verification.suiteTotal}</strong>`));
    assert.ok(content.includes(`<strong>${snapshot.verification.isolatedPostgresPassed} / ${snapshot.verification.isolatedPostgresPassed + snapshot.verification.isolatedPostgresFailed}</strong>`));
  }
});

const readSnapshot = async () => JSON.parse(await readFile(new URL("../docs/operating-snapshot.json", import.meta.url), "utf8"));

test("public aggregate snapshot has consistent dates and reconciliation totals", async () => {
  assert.deepEqual(validateSnapshot(await readSnapshot()), []);
});

test("aggregate snapshot rejects record text and arbitrary nested fields", async () => {
  const snapshot = await readSnapshot();
  snapshot.contactName = "NOT FOR PUBLICATION";
  assert.ok(validateSnapshot(snapshot).some(error => error.includes("unexpected")));
  delete snapshot.contactName;
  snapshot.historyImport.messages = ["NOT FOR PUBLICATION"];
  assert.ok(validateSnapshot(snapshot).some(error => error.includes("historyImport")));
  delete snapshot.historyImport.messages;
  snapshot.knowledge.documents = "NOT FOR PUBLICATION";
  assert.ok(validateSnapshot(snapshot).some(error => error.includes("knowledge.documents")));
});

test("snapshot rejects inflated test passes, import totals and uptime claims", async () => {
  const snapshot = await readSnapshot();
  snapshot.verification.suitePassed += snapshot.verification.suiteSkipped;
  snapshot.historyImport.sourceRecords += 1;
  snapshot.continuousUptimeMeasured = true;
  const errors = validateSnapshot(snapshot);
  assert.ok(errors.some(error => error.includes("suite totals")));
  assert.ok(errors.some(error => error.includes("reconciliation totals")));
  assert.ok(errors.some(error => error.includes("uptime")));
});

test("snapshot rejects invalid dates and nonnumeric or negative counts", async () => {
  const snapshot = await readSnapshot();
  snapshot.asOf = "2026-02-30";
  snapshot.knowledge.documents = -1;
  snapshot.personalizationExample.evidenceItems = 2.5;
  const errors = validateSnapshot(snapshot);
  assert.ok(errors.some(error => error.includes("invalid calendar date")));
  assert.ok(errors.some(error => error.includes("knowledge.documents")));
  assert.ok(errors.some(error => error.includes("personalizationExample.evidenceItems")));
  snapshot.asOf = "2026-10-29";
  snapshot.elapsedCalendarDays = 44;
  assert.ok(validateSnapshot(snapshot).some(error => error.includes("calendar interval")));
});
