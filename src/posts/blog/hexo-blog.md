---
layout: ../layouts/MarkdownPostLayout.astro
title: 'hexo的博客搭建'
pubDate: 2025-05-01
description: '这是关于如何使用hexo编写博客和构建web博客的教程。'
author: 'homura'
tags: ["blogging", "hexo"]
---


## 1. 博客项目搭建

##### 全局安装
~~~bash
npm install -g hexo-cli
~~~

##### 1.1 项目初始化

在你的自定义路径下执行新建 `hexo` 博客项目的构建命令：

~~~bash
hexo init <your-project-name>
~~~

然后安装依赖：

~~~bash
npm install
~~~

启动服务，验证整个项目的完整性：
~~~bash
hexo server # 或者 hexo s
~~~

##### 1.2 配置标签页 `tags` 和分类页 `categories`

默认情况下，初始化项目后开启服务`hexo server`是看不到这两类页面，就算是在 `URL`上写，也会直接报 <code style="color: red">404</code> 错误。（文档没说怎么开启）。

1. 在根目录下的`source`文件夹创建`tags`文件夹和`categories`文件夹。

2. 对应文件夹下创建子页面

~~~bash
# 创建标签tags页
## 分类页类似
hexo new page "tags"
~~~

3. 修改子页面的内容
~~~
---
title: tags
type: tags
layout: "tags"
---
~~~

4. 配置主题theme目录下对应的配置文件:

若使用了第三方的主题，可以在`_config.yml`文件里进行编辑；但一般情况下，第三方的主题有对应的设置。
~~~yml
nav:
  home: /
  about: /about
  tags: /tags
~~~

##### 1.3 配置 `About` 页面

参考 `1.2` 进行设置。



## 2. 编写文章

> 个人的文章编辑、发布流程：`hexo new draft "blog-name"` -> `hexo s --draft` -> `hexo publish "blog-name"` -> `hexo d`

##### 2.1 创建（草稿）文章：

~~~bash
hexo new draft "your article name" 
~~~

使用`draft`进行文章编辑 + `hexo s --draft`的模式可以在不需要重复执行`hexo s`就可以实时浏览自己文章的展示效果（但要刷新页面)。
确定最终稿后使用`hexo publish "【文章文件名】"`将其放置得到post目录进行随后的博客展示。


##### 2.2 文章基本结构

~~~
---
title: 'title'
date: 2023/6/12 20:12:00
tags: 
  - tags1
  - tags2
categories:
  - c1
  - c2
---

...文章的简介

<!-- more --> # 这个是在首页展示文章时不展示该标签以下的内容
~~~

> `<!-- more -->` 标签的上面要有一些摘要才能生效; 
> `date` 标签，hexo一般会根据当前时间进行设置，可以不写。

执行本地命令查看实现效果：
~~~bash
hexo s --draft
~~~

发布到`_posts`目录：
~~~bash
hexo publish [layout] "title"
~~~

## 3. 远程仓库部署

> 本文中使用的是 `Git + GitHub + SSH`，以及声明仓库为 `public`（为了白嫖） 。

##### 3.1 配置 SSH 密钥 和 远程仓库 密钥设置

打开终端输入命令：
~~~bash
ssh-keygen -t ed25519 -C <email>
~~~
`email`是你GitHub的登录邮箱。

然后添加到 `SSH Agent`。
~~~bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
~~~



##### 3.2 配置 GitHub 仓库

1. 自行新建仓库，唯一主要的是仓库名为`<your-github-name>.github.io`，和 `public`开放仓库。

2. 新建好仓库后，复制 `SSH` 的url链接，留给下文使用。

##### 3.3 本地项目设置

1. 安装依赖

~~~bash
npm install hexo-deployer-git --save
~~~

2. 编辑配置文件

~~~yml
deploy:
  type: git
  # 将刚才的链接粘贴到repo这里
  ## example, git@github.com:hexo/hexo.github.io.git
  repo: git@github.com:<your-github-name>/<your-github-repositories>.github.io.git
  branch: main
~~~

> 注意：如果你有多个密钥，请在`~/.ssh/config`中配置对应的密钥别名，然后将 `repo` 中的 `github.com` 换成你对应的密钥别名，
> 比如：git@github.com-first:<your-github-name>/<your-github-repositories>.github.io.git

##### 3.4 远程部署

> 在部署前请检查你 git 当前的 `user.name` 和 `user.email`.
> 命令 `git config <--global> user.name` 和 `git config <--global> user.email`;
> 如果你想在当前项目下另设别的github账户，去掉 `--global` 并在对应命令后面加上你的"githubName" 和 "githubEmail"

1. `hexo clean`(或者`hexo cl`)：清空生产的缓存文件（public文件夹和deploy_git文件夹）;

2. (可选：确定部署时的展示效果) `hexo generate`(`hexo g`)：生成的静态文件;

3. `hexo deploy`(`hexo d`)：远程部署；

4. 访问你的<name>.github.io网站。
如果遇到`404`报错不要慌，因为GitHub要部署你的博客网站一般在10分钟左右，让子弹飞一会。