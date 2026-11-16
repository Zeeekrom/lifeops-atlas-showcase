# AI agents and execution boundaries

Reviewed: 16 November 2026. This is a public engineering description of the
private implementation, not a runnable agent endpoint or production prompt.

## Roles, not a claim of unrestricted autonomy

LifeOps uses a research-agent workflow plus narrower text workers. Atlas
coordinates the jobs and retains their results. The word “agent” does not turn
every timer, connector or model call into an autonomous decision-maker.

| Component | AI involvement | Input and output | Execution boundary |
| --- | --- | --- | --- |
| Daily Radar research | Research and reasoning workflow | Bounded Atlas state, permitted-source evidence; structured report, discoveries and source coverage | OpenClaw remains on this path during migration; Atlas validates and persists its results |
| Conversation answers | Text inference | Supplied record snapshot, recent conversation and retrieved text; read-only answer | Official Codex CLI with isolated text-task settings |
| Career text | Text inference | Supplied resume, JD and applicable writing constraints; Summary or ordinary answer draft | Same restricted Codex adapter; source/template checks remain in application code |
| Source refresh | No model for the ordinary refresh | Read-only source results and allowlisted text | Deterministic coordinator and source-specific readers |
| Browser prefill | Application automation, distinct from the text model | Prepared ordinary field answers and generated resume copy | Separate Career Ops adapter; sensitive fields and final submission remain manual |
| Delivery | No model needed to send an already saved report | Persisted report and configured destination | Separate delivery state; Discord still uses OpenClaw on the current installation |

## What changed on 15 November

The text adapter calls the official Codex CLI using the operator's existing
ChatGPT sign-in. It checks that authentication mode before inference and
requires the OpenAI provider. API-key variables are not passed to the child.
The selected subscription is still subject to its own model access and limits.

Each invocation has:

- a fresh temporary working directory and bounded input/output;
- ignored personal configuration/rules and disabled project-document ingestion;
- a filesystem profile denying general host access, with the minimal OS
  baseline and read-only temporary workspace;
- command networking disabled, together with command tools, web search, apps,
  plugins, hooks, collaboration, goals, memory and host skill discovery;
- a structured-output contract for chat and Summary, bounded runtime, cleanup
  and rejection of unexpected tool events;
- no automatic switch to OpenClaw, another provider or a paid API.

These settings are per invocation, not changes to all of the operator's other
projects. They reduce the available capabilities; they do not establish that
every possible attack or future CLI change has been tested.

The text worker receives already selected evidence. A request for a new live
source cannot be treated as a completed read merely because a model can discuss it.
Ordinary chat cannot execute an Action change.

## What remains application code

Atlas owns the hourly coordinator, durable queue, worker claims, output checks,
record identity, correction replay and user editing forms. The daily research
job normally runs at 6:00 PM in the configured Hobart schedule. An accepted job,
a generated report and a delivered message are distinct outcomes.

Personal corpus entries preserve origin and review state. A conference speaker's
idea is not automatically the user's achievement; a technology announcement is
not a skill claim. Retrieval uses PostgreSQL text chunks and lexical ranking.

The ChatGPT handoff copies an explicit context package for the user. Returned
text remains external evidence, and no complete ChatGPT-history search is claimed.

## Acceptance observations

Recorded on 15 November 2026:

- A real chat crossed the HTTP queue, was claimed by the Codex worker, and
  saved its answer and an actual executor usage receipt.
- An adversarial synthetic chat requested an outside-workspace file, record
  changes and browsing. The canary was not disclosed, the source stayed
  unchanged, no tool event occurred, and executable proposals stayed empty.
- The actual Career Summary generator returned a grounded synthetic draft.
  No source resume was edited and no application was submitted.
- The full-suite run recorded 342 passes and 18 conditional skips out of 360.
  Five isolated PostgreSQL usage/read-only-chat checks passed separately.
  Follow-up targeted tests covered installation-path selection and text policy.

The skipped checks are not passes. The figures describe those runs rather than
a live test total. This documentation update does not rerun private research,
publish a live dataset or claim a comprehensive security assessment.

Codex input counters include cached input. Available input/output/cache values
retain their executor source; missing context capacity and account quota stay
unknown. Telemetry capture does not require an extra inference call.

## Migration still to do

Radar research/personalisation, remaining evidence paths and Discord
sending/history still require migration and end-to-end acceptance. Only then
can the corresponding OpenClaw gateway, startup entries and unused access be
retired. The static public demo has neither these credentials nor a connection
to the private installation.

LinkedIn is manual-only across the whole project, whether signed in or anonymous.

## 中文说明

AI 层分为研究智能体流程和更窄的文字执行器。调度器、来源读取器和数据库校验
仍是普通程序，不会因为用了模型就被称为自主智能体。

- **研究雷达：** 仍使用 OpenClaw，返回结构化报告、发现与来源覆盖，Atlas 负责校验保存。
- **聊天回答：** 已直连官方 Codex，读取传入的快照和文本，聊天保持只读。
- **求职文字：** 同样走受限 Codex，改写 Summary 或草拟普通答案；模板、事实检查、
  网页预填和最终提交边界由独立程序控制。
- **普通同步和配送：** 无需模型推理；是否读到来源、是否保存报告、是否送达分别记录。

11 月 15 日的迁移使用已有 ChatGPT 登录，调用前检查认证方式，排除 API key 环境变量。
每次调用使用临时工作区、受限文件／网络权限，关闭命令工具、网页搜索、应用、
插件和其他不需要的能力；不会失败后自动改走付费 API 或 OpenClaw。
这些是单次调用设置，不修改其他项目的全局配置，也不代表通过了全面安全审计。

真实消息队列、回答保存、用量记录和合成 Summary 生成已完成验收。
合成对抗请求没有读取工作区外的测试值、修改记录或访问链接，没有工具事件。
完整测试当次记录 342 项通过、18 项条件跳过，共 360 项；另一组隔离数据库检查
5 项通过。条件跳过不算通过，这些数字不是实时测试总数。

剩余的研究、相关证据链和 Discord 依赖还需迁移验收，再考虑停用 OpenClaw。
公开演示不持有这些凭据，也不连接私有实例。所有自动化入口继续禁止访问领英。

[Back to English README](../README.md#where-the-ai-agents-fit) ·
[返回中文 README](../README.zh-CN.md#ai-智能体在什么位置)
