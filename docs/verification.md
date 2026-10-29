# Snapshot definitions and verification limits

Publication date: 29 Oct 2026. The numeric observations are curated from a
private operator acceptance record dated the same day. Reviewers can inspect
the definitions and public validation here; the underlying private data and
test database are not exposed.

| Field | Meaning | Does not establish |
| --- | --- | --- |
| `elapsedCalendarDays` | Calendar difference from 16 Sep to 29 Oct: 43 days | Continuous uptime, daily active use or an availability SLO |
| `knowledge` | 160 allowlisted documents across three read-only text collections at acceptance | 160 original media files analysed, or every source folder ingested |
| `historyImport` | 418 source records: 264 matched, 153 added, one archive-only | New reports, sent messages or unique conversations |
| `personalizationExample` | One acceptance example saved three recommendations with 22 frozen evidence items | A daily rate, user achievement or independently verified advice quality |
| `verification` main suite | 295 tests: 288 passes, seven conditional skips, zero failures | The skipped database scenarios ran in that suite |
| Isolated PostgreSQL group | 27 passes and zero failures in a separately configured test database | A production write test, ongoing availability or no remaining defects |

The public numeric file contains a fixed allowlist of numbers, dates and schema
flags, with no room for names, record IDs, source paths or free-text excerpts.
Consistency checks verify the import and test arithmetic and calendar interval.
They validate the publication format, not the truth of private-source evidence;
source review remains a separate human responsibility.

## Validation layers

1. Production implementation tests and the dated operator acceptance record.
2. Public snapshot schema, arithmetic and date consistency.
3. Publication scan for forbidden files, private identifiers and common secret
   patterns, followed by complete diff review.
4. Separate synthetic demo data, whose values are illustrative rather than
   business metrics.

This publication task does not rerun a model, contact people, send notifications,
submit applications or reopen the production database. Historical test results
stay labelled as historical acceptance evidence.

## 中文说明

43 天只是项目影子对比开始以来的自然日跨度；不是连续在线。
160 是选定文本的索引规模；418 是历史来源记录对账规模。
295 项主测试中 7 项条件跳过，不能计为通过；27 项真实数据库测试是另一组独立验收。
这次发布不重新运行模型或操作生产数据，也不据此推断录用、业务转化或节省时间的结果。
