---
title: "Vercel：项目CI/CD流程"
description: "探讨Github的项目推送至Vercel的自动化运维流程"
pubDate: 2026-10-16
author: "homura"
tags: ["CICD", "Vercel"]
---

## 环境准备

1. Git-fork && GitHub-fork

- dev
- prod

2. Vercel 配置

[your-project] -> Settings -> Environments -> `Branch Tracking` Card，`Branch is` [你的分支，默认main]