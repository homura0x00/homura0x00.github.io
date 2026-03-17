---
title: "如何实现一个现代风格的磨砂玻璃 Header"
description: "详细拆解如何使用 Astro 和 Tailwind CSS 实现随着滚动变模糊的 Sticky Header，包含核心原理与代码实现。"
pubDate: 2026-02-10
author: "homura"
image:
    url: "https://docs.astro.build/assets/full-logo-light.png"
    alt: "Astro logo"
tags: ["Astro", "Tailwind CSS", "Frontend", "Tutorial"]
---

在现代 Web 开发中，尤其是 SaaS 产品或个人作品集网站，一个设计精良的 Header 是提升用户体验的关键。

你可能见过这种效果：当你刚进入网页时，Header 是完全透明的，完美地融入背景大图（Hero Section）；而当你开始向下滚动查看内容时，Header 会变成半透明的磨砂玻璃效果，并始终吸附在顶部。

这篇文章将带你一步步拆解如何在 Astro 项目中实现这个效果。

## 1. 核心原理

要实现这个效果，我们需要结合 CSS 的定位特性、滤镜效果以及 JavaScript 的滚动监听。

### A. Fixed 定位
首先，我们需要让 Header 始终显示在视窗顶部，不随页面滚动而消失。这需要用到 CSS 的 `fixed` 定位。

### B. Backdrop Blur (背景模糊)
这是“磨砂玻璃”质感的来源。CSS 属性 `backdrop-filter: blur(12px)` 可以让元素**背后**的内容变得模糊。配合半透明的背景色（如 `bg-white/70`），就能营造出高级的通透感。

### C. 滚动监听
我们需要通过 JavaScript 监听 `window.scrollY`。
- 当 `scrollY` 为 0（在顶部）时：保持 Header 透明。
- 当 `scrollY` 大于某个值（如 20px）时：添加背景色和模糊效果。

## 2. 代码实现

以下是基于 **Astro** 和 **Tailwind CSS** 的完整实现代码。

### HTML 结构 (Astro Component)

首先，我们在 `src/components/Header.astro` 中定义结构：

```html
<header 
  id="main-header" 
  class="flex z-50 fixed left-0 right-0 top-0 items-center transition-all duration-300 border-b border-transparent"
>
    <div class="flex lg:max-w-7xl w-full mx-auto justify-between m-4 px-10">
        <!-- Logo 区域 -->
        <div>
          <a href="/">Homura Blog</a>
        </div>
        
        <!-- 导航链接 -->
        <nav>
           <!-- 你的导航组件 -->
        </nav>
    </div>
</header>
```

**关键类名解析：**
*   `fixed left-0 right-0 top-0`: 将 Header 钉在顶部，拉伸至全宽。
*   `z-50`: 确保 Header 层级最高，不会被页面内容遮挡。
*   `transition-all duration-300`: 让背景色的切换有 0.3 秒的平滑过渡，避免生硬跳变。
*   `border-transparent`: 初始状态下边框透明。

### JavaScript 交互逻辑

接下来，在同一个文件的 `<script>` 标签中添加逻辑：

```html
<script>
    function initHeader() {
        const header = document.getElementById('main-header');
        if (!header) return;

        const updateHeader = () => {
            // 当滚动超过 20px 时触发效果
            if (window.scrollY > 20) {
                header.classList.add(
                    'bg-white/70',           // 亮色模式背景
                    'dark:bg-zinc-950/70',   // 深色模式背景
                    'backdrop-blur-md',      // 核心：磨砂玻璃效果
                    'shadow-sm',             // 轻微阴影
                    'border-zinc-200/50',    // 亮色边框
                    'dark:border-zinc-800/50'// 深色边框
                );
                header.classList.remove('border-transparent');
            } else {
                // 回到顶部，移除效果，变回透明
                header.classList.remove(
                    'bg-white/70', 
                    'dark:bg-zinc-950/70', 
                    'backdrop-blur-md', 
                    'shadow-sm', 
                    'border-zinc-200/50', 
                    'dark:border-zinc-800/50'
                );
                header.classList.add('border-transparent');
            }
        };

        // 1. 初始化时检查一次（防止用户刷新时已经在页面中间）
        updateHeader();

        // 2. 监听滚动事件
        window.addEventListener('scroll', updateHeader);
        
        // 3. (可选) 如果你使用了 Astro View Transitions，需要处理清理逻辑
        return () => {
            window.removeEventListener('scroll', updateHeader);
        };
    }

    // 立即运行
    initHeader();

    // 兼容 Astro 的 View Transitions
    document.addEventListener('astro:page-load', initHeader);
</script>
```

## 3. 移动端适配思路

虽然上面的代码解决了样式问题，但在移动端，我们通常不希望把所有导航链接都挤在 Header 里。

利用 Tailwind 的响应式前缀，我们可以轻松实现“电脑显示列表，手机显示汉堡菜单”：

```html
<nav>
    <!-- 手机端显示的按钮 (md 以上隐藏) -->
    <button class="block md:hidden">
        Menu
    </button>

    <!-- 电脑端显示的列表 (默认隐藏，md 以上显示为 flex) -->
    <ul class="hidden md:flex gap-4">
        <li><a href="/">首页</a></li>
        <li><a href="/blog">博客</a></li>
    </ul>
</nav>
```

## 总结

通过结合 `fixed` 定位、`backdrop-filter` 滤镜和简单的 JS 滚动监听，我们就实现了一个既美观又实用的现代 Header。这种设计不仅提升了视觉层次感，还能确保用户在浏览长页面时随时能找到导航入口。

快去你的项目中试试吧！
