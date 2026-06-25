---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Go Web应用设计：Go 版 DDD 领域驱动设计'
pubDate: 2025-11-06
description: '一篇关于 Go-Web 开发的通用设计。'
author: 'homura'
tags: ["blogging", "hexo"]
---

### 技术栈

- 开发框架：Gin + Gorm
- 数据库： MySQL + Redis
- 权限验证：OAuth

### 项目结构

```bash
|- project/
|  |- cmd/
|     |- server/main.go
|
|  |- internal/
|     |- config/            
|     |- user/       	# 用户模块 
|     |- auth/       	# 权限校验层模块
|     |- utils/         # JWT、response结构体、业务状态码、密码加密等自定义业务工具
|	  |- ...
|- ...
```

#### DAL

```go
// /dal/dto/user.go
package dto

type UserVo struct {

}
```

#### Handler

```go
// user_handler.go
type UserHandler struct {
    userService *services.UserService
}

// NewUserHandler 初始化：注入service实例
func NewUserHandler(userService *services.UserService) *UserHandler {
    return &UserHandler{
        userService: userService,
	}
}

func (h *UserHandler) Login(c *gin.Context) {
	var login dto.LoginUserReq
	if err := c.ShouldBindJSON(&login); err != nil {
		res2.Error(c, res2.ParamCode, "参数格式错误")
	}
    ctx := c.Request.Context()
	userVO, err := h.userService.Login(ctx, &login)
	if err != nil {
		fmt.Println(err)
		res2.Error(c, res2.SystemError, "服务器错误")
		return
	}
	// redis 存储登陆用户凭证
	// 随机生成session_id
	sessionId := utils.GenerateSession()
	userJson, err := json.Marshal(userVO)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "服务器错误"})
		return
	}

	redisKey := config.AppConfig.Session.SessionRedisPrefix + sessionId
	// 将 int 类型的数值 -> time 类型 -> 小时制单位
	sessionExpire := time.Duration(config.AppConfig.Session.SessionExpire) * time.Hour
	// session 存 redis
	err = global.Rdb.Set(c, redisKey, userJson, sessionExpire).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "服务器错误"})
		return
	}

	// 返回给前端的 Cookie
	c.SetCookie(
		config.AppConfig.Session.SessionCookieKey, // Cookie 键名
		sessionId,                    // Cookie值（session_id）
		int(sessionExpire.Seconds()), // 过期时间（秒）
		"/",                          // 路径（全站有效）
		"",                           // 域名（单服务器置空，默认当前域名）
		false,                        // Secure：仅HTTPS传输（生产环境必开）
		true,                         // HttpOnly：禁止JS访问（防XSS）
	)
	// （可选）SameSite=Strict 防CSRF
	c.Header("Set-Cookie", c.Writer.Header().Get("Set-Cookie")+"; SameSite=Strict")
}
```

```go
// user_service.go
package service

type UserService struct {
    q *query.Query
}

func NewUserService(q *query.Query) {
    return &UserService{
        q: q,
    }
}

// Login 用户登陆
func (s *UserService) Login(c *context.Context, req *dto.LoginUserReq) (*vo.UserVO, error) {
	// 1. 验证用户是否存在
	user, err := s.q.WithContext(c).User.Where(us.q.User.UserAccount.Eq(req.UserAccount)).First()
	if err != nil {
		return nil, errors.New("查询账户失败")
	}
	// 获取 hashed-password
	hashed := user.UserPassword
	// 2. 验证密码
	isPwd, err := utils.ParsePassword(req.UserPassword, hashed)
	if err != nil {
		return nil, errors.New("系统错误")
	} else if isPwd == false {
		return nil, errors.New("账户或密码错误")
	}
	// 3. 用户信息脱敏（前端）
	userVO := &vo.UserVO{
		UserAccount: user.UserAccount,
		Username:    user.UserName,
		UserRole:    user.UserRole,
	}
	return userVO, nil
}

```

