---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Go 程序开发的一些学习记录'
pubDate: 2025-11-06
description: '关于 Go 开发的一些操作与配置。'
author: 'homura'
tags: ["blogging", "golang"]
---

#### 常用技术栈

- Web开发架构： Gin + Gorm
- 配置文件读取: viper 

#### 一些指令

```shell
# 系统 指令架构 go build -o 编译后的程序名 当前项目的main入口路径
GOOS=linux GOARCH=amd64 go build -o server-app .
```
