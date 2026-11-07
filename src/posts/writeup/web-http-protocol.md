---
layout: ../layouts/MarkdownPostLayout.astro
title: 'ctf学习：HTTP 协议'
pubDate: 2026-11-05
description: '学习如何利用HTTP'
author: 'homura'
tags: ["ctf", "HTTP"]
---

## HTTP Protocol

HTTP Method 通常有 `GET`, `POST`, `UPDATE`, `DELETE`, `OPTSION` 等方法，而在实际开发中用`GET`和`POST`的 Method 会比较多。

### CURL 工具利用

```shell
curl -v -X CTFHUB http://challenge-eab8655534f21baa.sandbox.ctfhub.com:10080/index.php
```

使用方法：`curl ... [url]` 

- `v`: 打印请求的详细过程，例如上述http请求从request到response的过程。
- `X`: 指定请求方法，可以自定义构造，例如`CTFHUB`。

## Basic access authorization: 密码字典爆破

- Tools: Yakit, BurpSuite

最后选择了`Yakit`，原因是`burp suite`操作繁琐、复杂.

但基本思路是一样的，流程如下：

1. 开启数据劫持（渗透测试环境准备）
2. 搜集漏洞资产信息：在当前环境是一个登录界面，尝试发送登录请求并拦截。
2. 解析登录请求数据包，挖掘登录漏洞。
- 确认使用base64 + token对用户账号和密码进行编码，且该环境显性提示使用admin用户。
- 无request次数限制
4. 构造登录请求，使用密码字典爆破。

### 详细过程

1. 在Yakit开启`MITM 交互式劫持`，在登录界面，输入用户账号+密码；在Yakit中选择手动劫持模式，然后再让登录页发送登录请求。
2. 在Yakit中查看请求报文，确认`Authorization`字段里的数据进行加密并对其进行解码（一般为base64）；
3. 发现报文中有显性的用户信息提示，即使用`admin`用户进行登录；
4. 构造登录请求，在Authorization字段的basic后面拼接用户登录信息，插入base64方法并嵌入密码爆破字典，进行密码爆破,
```shell
Authorization: Basic {{b64(admin:{{file:line(/10_million_password_list_top_100.txt)}})}}
```
5. 登录成功，flag到手。