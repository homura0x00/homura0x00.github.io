---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Java Web 学习小扎'
pubDate: 2025-12-10
description: 'Jav-Web 学习的零散记录。'
author: 'homura'
tags: ["blogging", "Java Web"]
---

## Java Web 快速开发

### 依赖
- Spring Web
- Mybatis plus
- Lombok
- MySQL

### 项目结构

```bash
```bash
|- myproject
	|- src/.../[youbackname]
		|- annotation # 注解
		|- aop # aop切面，常用于user role鉴权
		|- common # 常用方法
		|- constant #
		|- controllers
		|- exception # 通用异常处理
		|- mapper # mybatis 依赖使用
		|- models
		|- services
		[yourprojectname]Application.java
```

### aop切面设计


`annotation/AuthCheck.java`

```java

public @interface AuthCheck {
    /**
     * 必须要有某个用户角色
     */
    String mustRole default "";
}
```

`aop/AuthInterceptor.java`

```java

@Aspect
@Component
public class AuthInterceptor {
    @Resource
    private UserService userService;

    /**
     * 执行拦截
     *
     * @param joinPoint 切入点
     * @param authCheck 权限校验注解
     */
    @Around("@annotation(authCheck)")
    public Object doInteroceptor(ProceedingJoinPoint joinPoint, AuthCheck authCheck) throws Throwable {
        String mustRole = authCheck.mustRole();
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
        // 获取当前登陆用户
        User loginUser = userService.getLoginUser(request);
        UserRoleEnum mustRoleEnum = UserRoleEnum.getEnumByValue(mustRole);
        // 如果不需要就放行
        if (mustRoleEnum == null) {
            return joinPoint.proceed();
        }
        // 以下的代码：必须有权限，才会通过
        UserRoleEnum userRoleEnum = UserRoleEnum.getEnumByValue(loginUser.getUserRole());
        if (userRoleEnum == null) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 要求必须有管理员权限，但用户没有管理员权限，拒绝
        if (UserRoleEnum.ADMIN.equals(mustRoleEnum) && !UserRoleEnum.ADMIN.equals(userRoleEnum)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 通过权限校验，放行
        return joinPoint.proceed();
    }
}
```
