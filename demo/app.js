const copy = {
  en: {
    subtitle: "Synthetic engineering demo", synthetic: "Synthetic data only", today: "Today", radar: "Radar", networking: "Networking", quality: "Data quality",
    workspace: "DAILY WORKSPACE", todayTitle: "Decide what matters next", healthy: "Pipeline healthy", agenda: "Today & tomorrow", agendaHint: "Calendar-aware blocks in local time",
    weather: "Action weather", weatherHint: "Decision summary, not raw telemetry", weatherCondition: "Clear · feels like 17°C", weatherOne: "Warmer than yesterday; light layer after 7 PM.", weatherTwo: "UV reaches 5.8; sunscreen before 10:20 AM.", weatherThree: "Low rain chance; umbrella not required.",
    actions: "Priority actions", actionsHint: "Audited tasks with explicit state", add: "+ Add", priority: "Priority", item: "Item", due: "Due", state: "State",
    radarEyebrow: "AUDITABLE AUTOMATION", radarTitle: "Opportunity radar", run: "Run synthetic cycle", coverage: "Source coverage", coverageHint: "A report cannot claim complete coverage when a required source fails", complete: "Complete",
    relationshipEyebrow: "RELATIONSHIP MEMORY", networkingTitle: "People and conversations", stages: "Relationship stages", stagesHint: "Current state, not message volume", recent: "Recent interactions", recentHint: "Click a row to inspect provenance", person: "Person", channel: "Channel", summary: "Summary",
    qualityEyebrow: "VISIBLE UNCERTAINTY", qualityTitle: "Data quality and conflicts", reviewQueue: "Identity review queue", reviewHint: "Ambiguous records are never silently guessed", trustOrder: "Evidence trust order", trustHint: "Higher authority wins during reconciliation", trustOne: "Explicit user correction", trustTwo: "Verified current evidence", trustThree: "Canonical confirmed state", trustFour: "Imported source state", trustFive: "Model inference",
    provenance: "PROVENANCE", done: "Done", events: "Events", openActions: "Open actions", waitingReplies: "Waiting replies", newSignals: "New signals", discoveries: "Discoveries", sourcesChecked: "Sources checked", duplicatesBlocked: "Duplicates blocked", needsReview: "Needs review", people: "People", activeConversations: "Active conversations", followUps: "Follow-ups", reviewQueueKpi: "Review queue", verified: "Verified", unresolved: "Unresolved", conflicts: "Conflicts", incidents: "Incidents", syntheticRun: "Synthetic cycle completed — no external action was performed.", syntheticAdd: "Demo only: a production create flow would write an audited command."
  },
  zh: {
    subtitle: "合成数据工程演示", synthetic: "仅使用合成数据", today: "今日", radar: "雷达", networking: "人脉", quality: "数据质量",
    workspace: "每日工作台", todayTitle: "决定下一步最重要的事", healthy: "核心链路正常", agenda: "今日与明日", agendaHint: "按本地时间显示日历区块",
    weather: "行动天气", weatherHint: "只显示行动建议，不堆原始指标", weatherCondition: "晴 · 体感 17°C", weatherOne: "比昨天暖；晚上 7 点后带一件薄外套。", weatherTwo: "最高 UV 5.8；上午 10:20 前涂防晒。", weatherThree: "降雨概率低，不需要特意带伞。",
    actions: "优先行动", actionsHint: "带审计记录的明确任务状态", add: "+ 新增", priority: "优先级", item: "事项", due: "截止", state: "状态",
    radarEyebrow: "可审计自动化", radarTitle: "机会雷达", run: "运行合成测试", coverage: "来源覆盖", coverageHint: "必查来源失败时，报告不能声称覆盖完整", complete: "已完成",
    relationshipEyebrow: "关系记忆", networkingTitle: "人物与沟通", stages: "关系阶段", stagesHint: "展示当前关系，而不是消息数量", recent: "最近互动", recentHint: "点击行查看数据来源", person: "人物", channel: "渠道", summary: "摘要",
    qualityEyebrow: "让不确定性可见", qualityTitle: "数据质量与冲突", reviewQueue: "身份确认队列", reviewHint: "存在歧义时不强行猜测", trustOrder: "证据优先级", trustHint: "协调冲突时，高权威证据优先", trustOne: "用户明确确认或修正", trustTwo: "当前已核验证据", trustThree: "已确认的系统状态", trustFour: "导入来源状态", trustFive: "模型推断",
    provenance: "数据来源", done: "完成", events: "活动", openActions: "开放行动", waitingReplies: "等待回复", newSignals: "新信号", discoveries: "发现", sourcesChecked: "已检查来源", duplicatesBlocked: "已阻止重复", needsReview: "需要复核", people: "人物", activeConversations: "正在沟通", followUps: "需要跟进", reviewQueueKpi: "复核队列", verified: "已核验", unresolved: "未解析", conflicts: "冲突", incidents: "事件", syntheticRun: "合成测试已完成，没有执行任何外部操作。", syntheticAdd: "演示模式：正式新增会写入带审计记录的命令。"
  }
};

let language = "en";
let data;
const $ = (selector) => document.querySelector(selector);
const make = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined) element.textContent = text; return element; };
const label = (key) => copy[language][key] || String(key).replaceAll(/([A-Z])/g, " $1").replaceAll("_", " ").trim();

function applyCopy() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-copy]").forEach((item) => { item.textContent = label(item.dataset.copy); });
  $("#language").textContent = language === "en" ? "中文" : "EN";
  if (data) render();
}

function kpis(target, rows) {
  const container = $(target); container.replaceChildren();
  rows.forEach((row) => { const card = make("article", "kpi"); card.append(make("span", "", label(row.label)), make("strong", "", row.value), make("small", "", row.detail)); container.append(card); });
}

function pill(value) { return make("span", `pill ${value}`, label(value)); }

function openDetail(title, fields) {
  $("#dialog-title").textContent = title;
  const body = $("#dialog-body"); body.replaceChildren();
  const grid = make("dl", "detail-grid");
  Object.entries(fields).forEach(([key, value]) => { grid.append(make("dt", "", label(key)), make("dd", "", value)); });
  body.append(grid); $("#detail-dialog").showModal();
}

function renderToday() {
  kpis("#today-kpis", data.todayKpis);
  const agenda = $("#agenda"); agenda.replaceChildren();
  data.agenda.forEach((item) => { const row = make("div", `agenda-item ${item.kind}`); row.tabIndex = 0; row.append(make("div", "agenda-time", item.time)); const detail = make("div"); detail.append(make("strong", "", item.title), make("small", "", item.location)); row.append(detail, pill(item.state)); row.addEventListener("click", () => openDetail(item.title, { source: item.source, observed: item.observed, state: item.state })); agenda.append(row); });
  const body = $("#actions-table"); body.replaceChildren();
  data.actions.forEach((item) => { const row = make("tr"); const priority = make("td"); priority.append(pill(item.priority)); const state = make("td"); state.append(pill(item.state)); row.append(priority, make("td", "", item.title), make("td", "", item.due), state); row.addEventListener("click", () => openDetail(item.title, { source: item.source, updated: item.updated, state: item.state })); body.append(row); });
}

function renderRadar() {
  kpis("#radar-kpis", data.radarKpis);
  const modules = $("#radar-modules"); modules.replaceChildren();
  data.modules.forEach((item) => { const card = make("article", "module"); card.append(make("small", "", `PART ${item.key}`), make("strong", "", item.count), make("h2", "", item.title), make("p", "", item.detail)); card.addEventListener("click", () => openDetail(`Part ${item.key} · ${item.title}`, { discoveries: String(item.count), status: "synthetic" })); modules.append(card); });
  const coverage = $("#coverage-list"); coverage.replaceChildren();
  data.coverage.forEach((item) => { const row = make("div", "coverage-row"), track = make("div", "coverage-track"), fill = make("div", "coverage-fill"); fill.style.width = `${item.percent}%`; track.append(fill); row.append(make("span", "", item.name), track, make("b", "", `${item.percent}% · ${label(item.state)}`)); coverage.append(row); });
}

function renderNetworking() {
  kpis("#network-kpis", data.networkKpis.map((item) => ({ ...item, label: item.label === "reviewQueue" ? "reviewQueueKpi" : item.label })));
  const max = Math.max(...data.stages.map((item) => item.count)); const bars = $("#stage-bars"); bars.replaceChildren();
  data.stages.forEach((item) => { const block = make("div"); const heading = make("div", "bar-label"); heading.append(make("span", "", item.name), make("b", "", item.count)); const track = make("div", "bar-track"), fill = make("div", "bar-fill"); fill.style.width = `${(item.count / max) * 100}%`; track.append(fill); block.append(heading, track); bars.append(block); });
  const body = $("#people-table"); body.replaceChildren();
  data.people.forEach((item) => { const row = make("tr"), state = make("td"); state.append(pill(item.state)); row.append(make("td", "", item.name), make("td", "", item.channel), make("td", "", item.summary), state); row.addEventListener("click", () => openDetail(item.name, { source: item.source, time: item.time, state: item.state })); body.append(row); });
}

function renderQuality() {
  kpis("#quality-kpis", data.qualityKpis);
  const list = $("#review-list"); list.replaceChildren();
  data.reviews.forEach((item) => { const card = make("article", "review-item"), head = make("header"); head.append(make("strong", "", item.title), pill(item.state)); card.append(head, make("p", "", item.reason)); card.addEventListener("click", () => openDetail(item.title, { source: item.source, reason: item.reason, next: item.next })); list.append(card); });
}

function render() { renderToday(); renderRadar(); renderNetworking(); renderQuality(); }
function toast(message) { const element = $("#toast"); element.textContent = message; element.classList.add("show"); setTimeout(() => element.classList.remove("show"), 2400); }

document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll(".tab,.view").forEach((item) => item.classList.remove("active")); button.classList.add("active"); $(`#${button.dataset.view}`).classList.add("active"); history.replaceState(null, "", `#${button.dataset.view}`); }));
$("#language").addEventListener("click", () => { language = language === "en" ? "zh" : "en"; applyCopy(); });
$("#run-demo").addEventListener("click", (event) => { const button = event.currentTarget; button.disabled = true; $("#run-state").textContent = "1 / 4"; let step = 1; const timer = setInterval(() => { step += 1; $("#run-state").textContent = step < 4 ? `${step} / 4` : label("complete"); if (step === 4) { clearInterval(timer); button.disabled = false; toast(label("syntheticRun")); } }, 420); });
document.querySelector("[data-copy='add']").addEventListener("click", () => toast(label("syntheticAdd")));

fetch("data.json").then((response) => response.json()).then((payload) => { if (payload.synthetic !== true) throw new Error("Demo data must be synthetic"); data = payload; applyCopy(); const requested = location.hash.slice(1); const tab = document.querySelector(`.tab[data-view='${requested}']`); if (tab) tab.click(); }).catch((error) => { document.body.textContent = `Demo could not load: ${error.message}`; });
