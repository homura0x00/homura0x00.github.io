---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Go Web应用设计：业务设计'
pubDate: 2025-11-06
description: '一篇关于 Go-Web 开发的通用设计。'
author: 'homura'
tags: ["blogging", "hexo"]
---

## 技术栈

- Gin + Gorm-Gen + MySQL

## 业务设计

### 项目结构

~~~bash
|- project/
|   |- cmd/v1/main.go
|   |- internal/
|       |- config/  # 读取相关配置文件的源码文件（如 *.yaml）
|       |- handler/ 
|       |- service/ 
|       |- model/   # gen生成的数据库表映射文件
|       |- query/   # gen生成数据库表对应的 CRUD 方法

~~~

### 业务源码

#### 核心业务

~~~go
// /model/dto/user.go
package dto

type RegisterUserReq struct {
    UserAccount     string  `json:"user_account"`
    UserPassword    string  `json:"user_password"`
    UserName        string  `json:"user_name"`
}

// /model/vo/user.go
type UserVo struct {

}
~~~

~~~go
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
~~~

~~~go
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

~~~
