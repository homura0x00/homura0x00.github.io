---
layout: ../layouts/MarkdownPostLayout.astro
title: 'AI应用开发工作流2：SPT'
slug: 'ai-coding-spec-plan-tasks'
pubDate: 2026-06-24
description: 'AI辅助下全栈开发的 spec-plan-task 流程设计'
author: 'homura'
tags: ["blogging", "claude code", "vibe coding", "soft engineer"]
---

传统的软件开发中，需要开发

### spec 需求设计

1. 项目初步设计与需求澄清

**PROMPT**

i）角色设定与初步想法
```bash
你好！现在的任务是：我们要从零开始设计并实现 `issue2md` 工具。

你现在不仅是资深的Go工程师，更是一位经验丰富的产品经理。我有一个初步的想法，需要你通过向我提问，帮助我澄清需求、挖掘边缘场景，最终目标是共创一份高质量的 `spec.md`。

我的初步想法是：**做一个命令行工具，输入一个GitHub Issue/PR/Discussion的URL，它就能自动将其转换为Markdown文件。**

请开始你的提问。
```

ii）提供你的初步想法后，Ai通过不断提问的方式将你的需求边界不断收缩。例如：
```bash
你好！我很高兴能以...[角色]与你共同参与...项目。

....，下面是我的几个问题：

Q1: Why ... ?
...

Qn: ... ?

...，你可以挑选几个核心问题进行回答，也可以回答全部问题给我。
```

iii）然后你可以针对性的回答核心问题和纠正AI关注的重点；并且 **ii）** 和 ** iii）** 是不断循环的，直到Ai和你理清需求后才会终止需求边界探讨。


2. spec需求确定与文档的格式化

通过与Ai的相互探讨，理清需求和边界问题后，就需要强制性规范ai的输出文档，便于以后的项目维护。

**PROMPT**
```
**现在，所有的需求都已清晰。

**请扮演“需求编译器”，执行以下操作：
1. 在项目根目录下创建一个名为 specs/001-core-functionality/ 的目录。
2. 在该目录下创建 spec.md 文件。内容必须包含： 
    * **用户故事**（含CLI和未来的Web版） 
    * **功能性需求**（涵盖我们讨论的所有细节：URL识别、Flags、Token、Markdown结构） 
    * **非功能性需求**（架构解耦、错误处理） 
    * **验收标准**（列出具体的测试Case） 
    * **输出格式示例**（包含你刚才设计的Markdown结构和Frontmatter）
    
请直接执行工具生成文件。
```

3. 持续开发设计
经过需求设计的文档敲定，我们可以让 AI 生成一份 **API 契约草稿**，用作项目的基本结构。

其目的是能让开发者和Ai能在后续的开发中有一个 **参考目录** ，能快速定位需要 ”更新“ 的模块。

**PROMPT**
```
非常好。基于这份 `spec.md` 和我们的 `constitution.md`（特别是关于包内聚的原则），请为这个功能设计详细的包结构。

请调用 `Bash` 工具，创建以下目录（如果尚未存在）：

- `cmd/issue2md/` (CLI入口)
- `cmd/issue2mdweb/` (Web入口)
- `internal/`
   ├── github/      # GitHub API 交互
   ├── parser/      # URL 解析与类型识别
   ├── converter/   # 数据转换为 Markdown
   ├── cli/         # 命令行接口
   └── config/      # 配置管理
- `web/templates/` (Web模板)
- `web/static/` (静态资源)

同时，请在 `specs/001-core-functionality/` 下创建一个 `api-sketch.md`，简要描述一下 `internal/converter` 和 `internal/github` 包对外暴露的主要接口（Interface/Function签名），作为后续开发的参考。
```

### plan 技术架构

用户的需要后，就需要选择要用到的技术，和针对性实施方案。

### tasks 开发流程设计