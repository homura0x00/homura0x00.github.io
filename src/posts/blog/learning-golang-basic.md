---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Go开发学习笔记(基础版)'
pubDate: 2025-11-06
description: '这是一篇用于回顾&&复习Go语言的文章'
author: 'homura'
tags: ["blogging", "golang"]
---

> 太久没写Go，快速回顾一下。

#### 一、常用技术栈

- Web开发架构： Gin + Gorm / HTTP STD
- 配置文件读取: viper 

---

#### 二、go build

```shell
# 系统 指令架构 go build -o 编译后的程序名 当前项目的main入口路径
GOOS=linux GOARCH=amd64 go build -o server-app .
```

---

#### 三、ACM

```go
package main

import (
	"fmt"
)

func main() {
	l := 0
	a := 0
	var b int
	fmt.Scan(&l)
	for i := 0; i < l; i++ {
		fmt.Scan(&a)
		b += a
	}
	fmt.Printf("This a is %d\n", b)
}

```

---

## 四、GO基础

小写包内可见，大写全局可见

类型:
int(8, 16, 32, 64), string, bool, array, slice, map, chan, interface(方法集合), 
rune（Unicode code，int32）中文用，complex(64, 128), function

### 4.1. 变量
```go
var v = 1

func f() {
    v2 := "短定义需要在函数体内"
}

const V3 = "这是常量"

var v4 string = "声明类型" // var v4 string
```

> 在go语言中，若未在声明中指定数值，编译器会将其指定默认值，e.g. 整数 = 0

### 4.2. 函数

#### 闭包 && 匿名函数

- 闭包: 就是把函数当成变量来使用
- 匿名函数: 没有名字的函数，通常用于 `goroutine`

```go
func main() {
    // 匿名函数
    f := func() {
        fmt.Println("groutine")
    }
    f()


    // 闭包
    var j int = 5
    closure := func() func() {
        var i int = 10
        return func() {
            fmt.Println("i, j: %d, %d\n", i, j)
        }
    }
}
```

### 4.3. 下划线 _

当有些 返回值、包 不需要使用时要用 `_` 下划线进行存储，表示忽略；否则编译器会报 “not used“ 错误。

### 4.4. 指针Pointer

`*` 指针变量声明 && 根据地址取值（前提是有 `&v` 变量，然后 `*v2` 对其进行取值，取到就是非地址值）;
`&` 取地址，即内存地址.

任何指针类型的变量都不能直接进行声明定义，需要通过 `new()` 和 `make()` 初始化

new()
```go
a := new(int)   // 基本变量的指针化
fmt.Println("%T\n", a)  // *int
fmt.Println(*a) // 0
*a = 10 
fmt.Println(*a)  // 10
fmt.Println(a)  // 内存地址
```

make() ：给切片、map、chan用的，用于内存分配
```go
func make(t Type, size ...IntegerType) Type // 类型、分配的大小，例如给切片初始化分多大的内存
```

### 4.5. 数组 && 切片

数组：初始化要指定大小（`固定大小`），只能通过下标进行元素操作
切片：多个数组组成的切片，用指针进行连接，有append()、cap()等方法

```go
// Array
arr := [5]int {1, 2, 3, 4} // 显性指定大小，元素默认为类型零值
arr2 := []int {1, 2, 3} // 隐性指定大小
arr2 := [...]int {1, 2, 3} // 隐性指定大小
arr[2] = 4  // 1, 2, 4, 4, 5

// Slice
s := make([]int, 8) // 用make方法进行slice创建时记得加上[]，后续有两个参数，若只写一个表示大小和cap容量相同
s = append(a, 1) // 尾部压入数值1，栈式压入法
// 对Array切片创建Slice
s2 := arr[0:2] // 1, 2, 4
```

### Map

#### Map
```go
make(map[KeyType]ValueType, [cap])

// 判断key存在
value, ok := map[key]



m := make(map[string]int, 8)
m["tim"] = 80

delete(m, "tim") // delete tim
```



### 结构体 struct

```go
type Student struct {
    name string
    age int8
    score float64
}

func main() {
    var s1 Student
    s1.name = "Tim"
    s1.age = 80

    var s2 struct{name: "yellow", score: 65.3}
}

type byte = int8 // 类型别名，但byte是关键字，默认为int8；同理rune=int32
```

#### 结构体的方法

> 类似于对象的方法

```go
type Student struct {
    name string
    age int8
    score float64
}

func (s Student) Create(name string, age, int8) {
    s.name = name
    s.age = age
}

func (s Student) Print() {
    fmt.Println("name: %s, age: %d", s.name, s.age)
}

func main() {
    var s1 Student
    s1.Create("tim", 80)
    s1.Print()
}
```