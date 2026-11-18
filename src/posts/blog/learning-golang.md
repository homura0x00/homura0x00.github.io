---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Go 程序开发的一些学习记录'
pubDate: 2025-11-06
description: '这是一篇用于回顾&&复习Go语言的文章'
author: 'homura'
tags: ["blogging", "golang"]
---

> 太久没写Go，这是一篇用于快速回顾Go基础和通常程序设计的文章。

#### 常用技术栈

- Web开发架构： Gin + Gorm / HTTP STD
- 配置文件读取: viper 

#### 一些指令

```shell
# 系统 指令架构 go build -o 编译后的程序名 当前项目的main入口路径
GOOS=linux GOARCH=amd64 go build -o server-app .
```

## GO基础 && 标准库

### 1. 变量
```go
var v = 1

func f() {
    v2 := "短定义需要在函数体内"
}

const V3 = "这是常量"

var v4 string = "声明类型" // var v4 string
```

> 在go语言中，若未在声明中指定数值，编译器会将其指定默认值，e.g. 整数 = 0

### 2. 