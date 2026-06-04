---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Go项目设计：配置文件的读取'
slug: 'Go-Viper-Config'
pubDate: 2025-11-06
description: '以 Go-Web DI项目开发实例下的配置文件读取。'
author: 'homura'
tags: ["blogging", "hexo"]
---

## 项目结构

```bash
|- project/
|  |- cmd/
|     |- server/app.go # DI注入根文件和应用启动主入口
|
|  |- configs/         # 配置文件
|
|  |- internal/
|     |- config/
|     |- dal/
|        |- model/          # gen生成的数据库表映射文件
|        |- query/          # gen生成数据库表对应的 CRUD 方法
|        |- dto/
|        |- vo/
|        |- mysql.go
|        |- redis.go
```

