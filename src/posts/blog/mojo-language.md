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

> 只能在函数体内使用 `var np = import_module("numpy")`的形式进行导入，类型都为`PythonObject`;
> 如果不使用`try-except`处理异常，需要声明返回类型为`raises`。

```mojo
from std.python import Python

def main() raises:
    var np = Python.import_module("numpy")
    # 然后就是python的写法
```