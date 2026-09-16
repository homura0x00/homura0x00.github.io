---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Git學習'
pubDate: 2022-03-01
description: '日常開發中Git的應用'
author: 'homura'
tags: ["blogging", "Git", "CI-CD"]
---

## 常用命令

```shell
# 添加當前目錄下所有文件（不包含.gitignore 文件里的排除目錄/文件）
git add .

# 入庫登記
git commit -m "給這次文件改動的備注消息記錄"

# 推送到遠程倉庫
git push origin 【你要push對應的分支】

# 分支管理
git branch 【要切換的分支】 # 如果不寫分支名則會列出基本分支
git merge 【branchname】    # 注：是當前分支合併merge的分支，然後再 git commit 合併成功

```

## 消息類別

- **feat：** feature，引入的新功能。(e.g. "feat: 添加web白名單過濾機制")
- **chore：** 构建过程、辅助工具或依赖库的变动（杂务）。（e.g. "chore: 初始化项目脚手架" 或 "chore: 升级 serde 依赖包"） 
- **docs：** 仅仅修改了文档、README。（例如："docs: 更新安装说明"）
- **style：** 不影响代码含义的格式变动（空格、格式化、缺少分号等，不是指前端 UI 样式）。（例如："style: 运行 cargo fmt 格式化代码"）
- **refactor：** 代码重构（既不是新增功能，也不是修复 Bug 的代码变动）。
- **test：** 增加测试代码或重构测试。


## 恢復 & 回退
- **git checkout：** 切换分支或恢复文件到指定提交。
- **git reset：** 重置当前分支到指定提交（软重置、混合重置、硬重置）。
- **git revert：** 创建一个新的提交以撤销指定提交，不改变提交历史。
- **git reflog：** 查看历史操作记录，找回丢失的提交。