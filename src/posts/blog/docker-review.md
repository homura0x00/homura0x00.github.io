---
layout: ../layouts/MarkdownPostLayout.astro
title: 'DevOps：docker'
slug: 'devops-docker'
pubDate: 2026-06-24
description: 'Review docker command'
author: 'homura'
tags: ["blogging", "DevOps", "Docker", "Command"]
---

## Create && Running

1. 启动 PostgreSQL 容器

在终端执行以下命令，这会拉取镜像并启动一个名为 pg17 的容器：
```bash

docker run -d --name pg17 \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  postgres:17
```

- POSTGRES_PASSWORD：设置超级用户 postgres 的密码（必需）。

- -p 5432:5432：将容器端口映射到宿主机，便于外部连接。

- 若需数据持久化，可添加 -v /宿主机/路径:/var/lib/postgresql/data。

2. 进入容器并创建数据库
```bash

# 进入容器的 bash 环境
docker exec -it pg17 bash

# 登录 PostgreSQL 交互终端
psql -U postgres
```

在 psql 提示符下，执行 SQL 创建数据库：
```sql

CREATE DATABASE testdatabase;
```

验证：输入 \l 查看数据库列表，确认 testdatabase 已创建。完成后输入 \q 退出。