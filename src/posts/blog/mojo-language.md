---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Mojo语言学习'
slug: 'learning-mojo-language'
pubDate: 2026-10-10
description: '以Python的方式渐入mojo'
author: 'homura'
tags: ["language", "mojo"]
---

## 与Python的细微区别

- 强制显性声明数据类型(var)
- 变量有类似rust的一次性所有权（不能重复声明？）

## 与Python的交互

### 导包

只能在函数体内使用 `var np = import_model("numpy")`的形式进行导入，并且类型都为`PythonObject`。