// Aggregate publication accepts dates, flags and counts only, never free text.
const rootKeys = ["schema", "asOf", "shadowStartedOn", "elapsedCalendarDays", "continuousUptimeMeasured", "knowledge", "historyImport", "personalizationExample", "verification"];

export function validateSnapshot(snapshot) {
  const errors = [];
  const object = (value, keys, label) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      errors.push(`${label}: expected an object`);
      return false;
    }
    if (Object.keys(value).length !== keys.length || keys.some(key => !Object.hasOwn(value, key))) {
      errors.push(`${label}: unexpected or missing fields`);
      return false;
    }
    return true;
  };
  const count = (value, label) => {
    if (!Number.isSafeInteger(value) || value < 0 || value > 1_000_000_000) {
      errors.push(`${label}: expected a bounded nonnegative integer`);
      return false;
    }
    return true;
  };
  const date = (value, label) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      errors.push(`${label}: expected a date only`);
      return null;
    }
    const timestamp = Date.parse(`${value}T00:00:00Z`);
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
      errors.push(`${label}: invalid calendar date`);
      return null;
    }
    return timestamp;
  };
  const counts = (value, keys, label) => {
    if (!object(value, keys, label)) return false;
    const checks = keys.map(key => count(value[key], `${label}.${key}`));
    return checks.every(Boolean);
  };

  if (!object(snapshot, rootKeys, "snapshot")) return errors;
  if (snapshot.schema !== "lifeops-atlas.public-snapshot.v1") errors.push("snapshot: unsupported schema");
  if (snapshot.continuousUptimeMeasured !== false) errors.push("snapshot: calendar age must not claim uptime");
  const end = date(snapshot.asOf, "asOf");
  const start = date(snapshot.shadowStartedOn, "shadowStartedOn");
  if (count(snapshot.elapsedCalendarDays, "elapsedCalendarDays") && end !== null && start !== null
    && (end - start) / 86_400_000 !== snapshot.elapsedCalendarDays) {
    errors.push("elapsedCalendarDays: inconsistent calendar interval");
  }
  counts(snapshot.knowledge, ["collections", "documents"], "knowledge");
  if (counts(snapshot.historyImport, ["sourceRecords", "matchedExisting", "addedMessages", "archivedWithoutText"], "historyImport")) {
    const h = snapshot.historyImport;
    if (h.sourceRecords !== h.matchedExisting + h.addedMessages + h.archivedWithoutText) errors.push("historyImport: inconsistent reconciliation totals");
  }
  counts(snapshot.personalizationExample, ["recommendations", "evidenceItems"], "personalizationExample");
  if (counts(snapshot.verification, ["suiteTotal", "suitePassed", "suiteSkipped", "suiteFailed", "isolatedPostgresPassed", "isolatedPostgresFailed"], "verification")) {
    const v = snapshot.verification;
    if (v.suiteTotal !== v.suitePassed + v.suiteSkipped + v.suiteFailed) errors.push("verification: inconsistent suite totals");
  }
  return errors;
}
