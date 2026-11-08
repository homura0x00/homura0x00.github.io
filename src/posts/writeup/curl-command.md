---
layout: ../layouts/MarkdownPostLayout.astro
title: 'ctf学习：curl工具使用'
pubDate: 2026-11-08
description: 'curl命令学习'
author: 'homura'
tags: ["ctf", "curl", "bash"]
---

## CURL

```powershell
curl [-v] [-X] [METHOD] [origin-url] [--output -]
```

- `--output -`: 强制输出，即遇到一些二进制文件，curl提示要么用 `-o` 下载，要么强制打印。
- `-o`: 下载文件.
- `-v`: 打印请求的详细过程，例如上述http请求从request到response的过程。
- `-X`: 指定请求方法，可以自定义构造，例如`CTFHUB`。