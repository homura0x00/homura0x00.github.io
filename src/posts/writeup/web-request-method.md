---
layout: ../layouts/MarkdownPostLayout.astro
title: 'ctf学习：Web HTTP请求'
pubDate: 2026-11-05
description: '学习如何修改HTTP请求'
author: 'homura'
tags: ["data-mining", "web-scraping", "python"]
---

## HTTP

HTTP Method 通常有 `GET`, `POST`, `UPDATE`, `DELETE`, `OPTSION` 等方法，而在实际开发中用`GET`和`POST`的 Method 会比较多。

## CURL 工具

```shell
curl -v -X CTFHUB http://challenge-eab8655534f21baa.sandbox.ctfhub.com:10080/index.php
```

使用方法：`curl ... [url]` 

- `v`: 打印请求的详细过程，例如上述http请求从request到response的过程。
- `X`: 指定请求方法，可以自定义构造，例如`CTFHUB`。