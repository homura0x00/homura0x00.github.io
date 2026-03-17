---
layout: ../layouts/MarkdownPostLayout.astro
title: '数据采集与清洗：从爬虫到数据挖掘的第一步'
pubDate: 2026-02-17
description: '用一个魔女文字小爬虫为例，系统复习数据采集与清洗的核心知识。'
author: 'homura'
tags: ["data-mining", "web-scraping", "python"]
---

> 目标：复习「数据挖掘的入口阶段」——数据采集（爬虫）和数据清洗。  
> 风格：偏实战，配合当前项目里的 `madoka_runes_scraper.py` 小脚本来理解。

## 阶段一：爬虫基础

这一阶段重点是：**把数据拿到手**，但先不追求「多快好省」，而是「能稳定拿到」。

### 1.1 请求层基础（以 Python `requests` 为例）

- 核心对象：`requests.get/post`、`params`、`data/json`、`timeout`、`Session`。
- 常见要点：
  - **超时**：一定要设 `timeout`，避免卡死。
  - **编码**：有些网站需要手动设 `resp.encoding`。
  - **重定向**：默认跟随，必要时检查 `resp.history`。

示例（伪代码）：

```python
import requests

session = requests.Session()
session.headers.update({
    "User-Agent": "MyLearningSpider/0.1 (for personal study)"
})

resp = session.get(
    "https://example.com/api",
    params={"q": "madoka"},
    timeout=10,
)
resp.raise_for_status()
data = resp.json()  # 如果是JSON接口
```

### 1.2 HTML 解析与「接口优先」

通用原则：**能走结构化接口（JSON、CSV、API），就不要先上 HTML 解析**。

- 优先顺序：
  - 开放 API / 内部 JSON 接口；
  - 其后才是：HTML + 解析工具。
- 常见解析工具：
  - `BeautifulSoup`：通过标签/类名筛选元素；
  - `lxml`（XPath）：适合结构稳定、复杂一点的页面；
  - `re`：只对特别简单、结构非常稳定的场景慎用。

动态页面（前端渲染）优先策略：

1. 打开浏览器开发者工具 Network 面板；
2. 手动操作页面，找到真正返回数据的接口；
3. 用脚本直接请求这些接口，而不是渲染整页。

### 1.3 用魔女文字小脚本理解「API 优先」

当前项目中的 `madoka_runes_scraper.py` 做的事情：

- 访问萌娘百科的 **MediaWiki API**（而不是直接爬 HTML）：
  - `action=parse&prop=images` 拿到词条中引用到的图片列表；
  - `action=query&prop=imageinfo&iiprop=url` 拿到每个图片的原始下载链接。
- 避免了直接解析 HTML 的各种细节变化，接口更稳定。

这就是一个典型的「先找接口」的例子。

---

## 阶段二：爬虫工程化与礼貌访问

这一阶段关注的是：**怎么「文明」地爬**，以及把爬虫写得更可靠。

### 2.1 礼貌访问（爬虫伦理）

几个基本原则：

- **尊重 robots.txt**：虽然不是法律，但反映站点运营者的意图；
- **控制频率**：不要高 QPS 猛打人家服务器；
- **声明身份**：用合理的 User-Agent，标注用途和联系方式；
- **只抓需要的内容**：明确范围，不做无意义的全站扫描。

在 `madoka_runes_scraper.py` 里，我们做的事情包括：

- 使用自定义 User-Agent，说明是个人学习用途；
- 仅访问官方 API，且只抓「魔女文字」这一个词条相关的图片；
- 增加了简单的限速参数 `--delay`，默认每个请求之间睡眠 1 秒。

运行示例：

```bash
# 默认：每个请求之间 sleep 1 秒
python madoka_runes_scraper.py

# 自定义：每个请求之间 sleep 2.5 秒
python madoka_runes_scraper.py --delay 2.5
```

### 2.2 工程化要素

常见的工程化要素包括：

- **重试机制**：
  - 针对临时网络问题、5xx 错误做有限次数重试；
  - 可以配合指数退避（1s、2s、4s……）。
- **日志与监控**：
  - 记录每个 URL 的请求结果（成功、失败、耗时）；
  - 方便追踪问题和控制抓取范围。
- **去重与断点续爬**：
  - 使用集合 / 数据库记录已经访问过的 URL；
  - 支持程序中断后从上次进度继续。
- **存储策略**：
  - 小规模：JSON、CSV、本地文件系统；
  - 中等规模：SQLite、PostgreSQL 等关系型数据库；
  - 更大规模：分布式存储、消息队列等（脱离个人学习范畴）。

`madoka_runes_scraper.py` 当前已经具备的工程化元素：

- 使用 `requests.Session` 复用连接；
- 限速参数 `delay` 控制基本频率；
- 将「字符 -> SVG 文件名列表」保存为 `char_to_svgs.json`，方便后续处理。

---

## 阶段三：数据清洗（Data Cleaning）

数据挖掘的经典经验是：**80% 的时间花在清洗上**。这一阶段的目标是：  
把原始数据整理成「干净、统一、可用」的结构化数据表。

### 3.1 载入与初步检查

通常会用 `pandas` 来做交互式的数据探索与清洗：

```python
import pandas as pd

df = pd.read_csv("data.csv")
df.head()
df.info()
df.describe()
```

其中：

- `head()`：看前几行，确认数据大致长什么样；
- `info()`：看列类型、非空数量，了解缺失情况；
- `describe()`：看数值特征的统计特性。

### 3.2 处理缺失值

步骤：

1. 查看缺失分布：

   ```python
   df.isna().sum()
   ```

2. 处理方式：
   - **删除**：对信息量极少、缺失非常严重的列，可以直接删；
   - **填补**：
     - 类别变量：填 `"unknown"`；
     - 数值变量：填均值/中位数/0，或使用模型插值。

示例：

```python
# 删除某些缺失列很多的列
df = df.drop(columns=["useless_col"])

# 数值列用中位数填补
df["age"] = df["age"].fillna(df["age"].median())

# 类别列缺失填 "unknown"
df["city"] = df["city"].fillna("unknown")
```

### 3.3 处理异常值

常见做法：

- 业务规则过滤：比如年龄必须在 [0, 120]；
- 统计规则过滤：比如使用箱线图（IQR）找出极端值：

```python
Q1 = df["value"].quantile(0.25)
Q3 = df["value"].quantile(0.75)
IQR = Q3 - Q1
mask = (df["value"] >= Q1 - 1.5 * IQR) & (df["value"] <= Q3 + 1.5 * IQR)
df = df[mask]
```

### 3.4 文本与类别清洗

- 文本标准化：
  - 去除前后空格：`str.strip()`；
  - 统一大小写：`str.lower()` 或 `str.upper()`；
  - 去掉 HTML 标签：正则或 `BeautifulSoup(text).get_text()`。
- 正则抽取有用信息：
  - 从字符串中抽邮箱/手机号/ID 等；
  - 从路径/文件名中解析字段。

在魔女文字的例子里：

- 我们从 SVG 文件名中用正则抽取字符信息：
  - 例如 `MadokaRunes_A_Archaic.svg`；
  - 可以解析出：`character = "A"`，`style = "Archaic"`，`filename = ...`。
- 这一步其实就是一种「特定领域的文本清洗」。

### 3.5 格式与类型统一

- 日期时间：

  ```python
  df["created_at"] = pd.to_datetime(df["created_at"])
  ```

- 类别变量：

  ```python
  df["gender"] = df["gender"].astype("category")
  ```

- 数值变量：
  - 去掉货币符号、千位分隔符后再转为数值；

  ```python
  df["price"] = (
      df["price"]
      .str.replace(r"[$,]", "", regex=True)
      .astype(float)
  )
  ```

---

## 阶段四：从清洗到简单特征工程

数据清洗之后，通常会进入一个「轻度特征工程」阶段，为建模做准备。

### 4.1 特征构造

常见的特征构造方式：

- **计数特征**：
  - 比如一篇文章的词数、链接数、图片数；
  - 在魔女文字例子中，可以是：某篇文本中使用了多少种不同魔女字符。
- **统计特征**：
  - 某个数值列在某一分组下的平均、方差、最大最小值；
  - 例如每个用户在一周内的访问次数、平均停留时间。
- **类别编码**：
  - One-Hot 编码：`pd.get_dummies(df["category"])`；
  - 或使用目标编码等更复杂方法（入门阶段不必强求）。

### 4.2 切分训练/测试集与简单模型

这部分已经开始偏向「传统数据挖掘/机器学习」：

- 使用 `sklearn.model_selection.train_test_split` 划分训练集/测试集；
- 使用简单模型做练习：
  - 回归：线性回归、随机森林回归；
  - 分类：逻辑回归、随机森林、XGBoost 等。

最重要的不是模型有多复杂，而是走一遍完整流程：

1. 明确问题（回归 / 分类 / 排序 / 聚类等）；
2. 采集数据（爬虫 / 日志 / 开放数据集）；
3. 清洗与特征工程；
4. 训练模型并评估；
5. 反过来再看：数据是否有偏、清洗是否合理。

---

## 小结与练习建议

可以用当前的魔女文字小爬虫作为一个完整练习的起点：

1. 使用 `madoka_runes_scraper.py` 下载 SVG，并生成 `char_to_svgs.json`；
2. 写一个小脚本：
   - 读取 `char_to_svgs.json`；
   - 解析每个文件名中的字符和风格（古代体/现代体/音乐体等）；
   - 清洗成表格：`character`, `style`, `filename`, `url(optional)`；
   - 导出为 CSV。
3. 在 Jupyter Notebook 里用 `pandas` 读这个 CSV：
   - 统计每种风格中不同字符的数量；
   - 可视化频率分布（例如用 `matplotlib` / `seaborn`）。

完成这一套之后，基本就把「采集 → 清洗 → 简单分析」的闭环跑通了一遍，是进入更深层数据挖掘（特征工程、建模）的一个很好的起点。

