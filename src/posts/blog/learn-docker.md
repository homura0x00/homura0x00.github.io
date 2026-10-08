---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Docker review and Learning CI/CD'
pubDate: 2026-10-01
description: 'Docker日常开发与CI/CD的探索'
author: 'homura'
tags: ["CICD", "Docker"]
---

> 该篇文章主要是个人在"AI辅助全栈开发"的环境下，Docker的日常使用和CI/CD的探索。

- Docker管理工具: OrbStack


## 常用命令

> 注意：在使用docker前要先启动OrbStack，否则会报docker api disconnect !

```bash

docker run -d -p 8080:80 --name mynginx nginx # 创建并运行容器
docker ps [-a] # 查看当前正在运行的容器, -a: 查看所有容器（包含未启动的）

docker start <container-name/ID> # 启动指定容器（名/ID），可多个一起

docker stop <container-name/ID> # 停止运行容器（name/ID），可多个

docker rm <container-name/ID>

docker restart <容器ID或名> # 指定容器重启
```

...loading...