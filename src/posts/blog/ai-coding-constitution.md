---
layout: ../layouts/MarkdownPostLayout.astro
title: 'AI原生应用开发工作流1：宪法'
slug: 'ai-coding-constitution'
pubDate: 2026-01-20
description: '通过宪法的强制性条约约束ai遵守'
author: 'homura'
tags: ["blogging", "claude code", "vibe coding", "soft engineer"]
---

#### 宪法

> 一种强制要求个人和 AI Agent 共同遵守的“原则契约”。

### Go后端设计

**constitution设计模版**

```md
# issue2md 项目开发宪法
# Version: 1.0, Ratified: 2025-10-20

本文件定义了本项目不可动摇的核心开发原则。所有AI Agent在进行技术规划和代码实现时，必须无条件遵循。

---

## 第一条：简单性原则 (Simplicity First)

**核心：** 遵循Go语言的“少即是多”哲学。绝不进行不必要的抽象，绝不引入非必需的依赖。

- **1.1 (YAGNI):** 你不需要它（You Ain't Gonna Need It）。只实现`spec.md`中明确要求的功能。
- **1.2 (标准库优先):** 除非有极其充分的理由，否则必须优先使用Go标准库。例如，Web服务使用`net/http`，而不是Gin或Echo。
- **1.3 (反过度工程):** 避免复杂的设计模式。简单的函数和数据结构优于复杂的接口和继承体系。

---

## 第二条：测试先行铁律 (Test-First Imperative) - 不可协商

**核心：** 所有新功能或Bug修复，都必须从编写一个（或多个）失败的测试开始。

- **2.1 (TDD循环):** 严格遵循“Red-Green-Refactor”（编写失败测试-让测试通过-重构）的循环。
- **2.2 (表格驱动):** 单元测试必须优先采用表格驱动测试（Table-Driven Tests）的风格，以覆盖多种输入和边界情况。
- **2.3 (拒绝Mocks):** 优先编写集成测试，使用真实的依赖或fake object（如内存中的GitHub API模拟服务器），而不是过度依赖Mock。

---

## 第三条：明确性原则 (Clarity and Explicitness)

**核心：** 代码的首要目的是让人类易于理解，其次才是让机器执行。

- **3.1 (错误处理):** **不可协商**：所有错误都必须被显式处理。绝不允许使用`_`丢弃错误。错误传递时必须使用`fmt.Errorf("...: %w", err)`进行包装。
- **3.2 (无全局变量):** 绝不允许使用全局变量来传递状态。所有依赖必须通过函数参数或结构体成员显式注入。
- **3.3 (注释的意义):** 注释应该解释“为什么”，而不是“是什么”。所有公共API都必须有清晰的GoDoc注释。

---

## 第四条：单一职责原则 (Single Responsibility)

**核心：** 每个包、每个文件、每个函数都应该只做好一件事。

- **4.1 (包的内聚):** `internal`目录下的各个包应保持高度内聚和低耦合。例如，`github`包只负责与GitHub API交互，绝不能包含Markdown转换逻辑。
- **4.2 (接口隔离):** 定义小的、目标明确的接口，而不是大而全的“上帝接口”。

---
## 治理 (Governance)

本宪法具有最高优先级，其效力高于任何`CLAUDE.md`或单次会话中的指令。任何计划（`plan.md`）在生成时，都必须首先进行“合宪性审查”。
```

---
### 前端设计

```markdown
# vue-web-admin 项目开发宪法
# Version: 1.0, Ratified: 2026-06-12

本文件定义了本项目不可动摇的核心开发原则。所有AI Agent在进行技术规划和代码实现时，必须无条件遵循。

---

## 第一条：极简与轻量化原则 (Simplicity & Minimalism First)
**核心：** 遵循现代前端的“奥卡姆剃刀”定律。绝不进行不必要的抽象，拒绝引入臃肿、非必需的第三方库。
- **1.1 (YAGNI):** 只实现需求文档中明确要求的功能.拒绝过度设计。
- **1.2 (原生与现代化优先):** 界面原子级组件（如 Button, Dialog, Input）必须无条件优先使用 `shadcn/ui`。严禁手写复杂的低层样式或引入其他重型 UI 库。
- **1.3 (反过度封装):** 简单的 setup 逻辑和单文件组件（SFC）优于层层嵌套的 HOC（高阶组件）或过度抽象的无渲染组件。

---

## 第二条：测试先行铁律 (Test-First Imperative) - 不可协商
**核心：** 所有新功能或Bug修复，都必须从编写一个（或多个）失败的测试开始。
- **2.1 (TDD循环):** 严格遵循“Red-Green-Refactor”循环。
- **2.2 (数据驱动驱动):** 元测试与接口测试必须优先采用参数化测试（Parameterised Tests）风格，利用 Vitest 的 `test.each` 或 `describe.each` 批量验证边界条件。
- **2.3 (有价值的Mocks):** 避免对 Vue 组件进行过度 Mock 导致测试失去意义。优先测试组件的行为（Behavior）而非内部实现细节；涉及 API 请求时，优先使用 `msw` (Mock Service Worker) 或在测试层进行干净的 Context/Props 注入。

---

## 第三条：明确性原则 (Clarity and Explicitness)
**核心：** 代码的首要目的是让人类易于理解。
- **3.1 (类型安全):** **不可协商**：严格禁止使用 `any` 类型。所有组件的 Props、Emits、API 响应数据以及 Vuex/Pinia 状态都必须有明确的 TypeScript 类型定义（Interface/Type）。
- **3.2 (无隐式副作用/全局污染):** 绝不允许使用全局 window 变量来传递状态。单例、全局配置或跨组件状态必须通过 Pinia 或 Vue 的 `provide/inject` 显式注入与追踪。
- **3.3 (异常与异步处理):** 所有异步操作（`async/await`）必须有明确的错误捕获机制（`try-catch` 或 统一的 `Axios/Fetch` 拦截器），且错误提示必须对用户友好，日志记录必须对开发者清晰。

---

## 治理 (Governance)
本宪法具有最高优先级，其效力高于任何`CLAUDE.md`或单次会话中的指令。
```