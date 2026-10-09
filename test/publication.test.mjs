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
