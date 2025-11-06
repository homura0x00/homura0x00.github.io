---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Go Web应用设计: 应用配置和Response方法'
pubDate: 2025-11-06
description: '一篇关于 Go-Web 开发的通用设计。'
author: 'homura'
tags: ["blogging", "hexo"]
---


### 应用配置
~~~go
package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	App struct {
		Port string
	}
	Database struct {
		Mysql MySQLConfig
		Redis RedisConfig
	}
	Jwt struct {
		Secret string `yaml:"secret"`
	}
	Session struct {
		SessionCookieKey   string `yaml:"sessionCookieKey"`
		SessionRedisPrefix string `yaml:"sessionRedisPrefix"`
		SessionExpire      int    `yaml:"sessionExpire"`
	}
}

var AppConfig *Config // 全局指针

func InitConfig(filename string) {
	viper.SetConfigName(filename) // 文件名称
	viper.SetConfigType("yaml")   // 文件类型

	// 多路径查询
	viper.AddConfigPath(".")             // 程序入口的当前地址，例如/project/cmd/v1/main.go 就是当前路径
	viper.AddConfigPath("./config")      // 项目内的config
	viper.AddConfigPath("../../config/") // 兼容子目录启动（如 /cmd/server 下启动）

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}

	AppConfig = &Config{}

	if err := viper.Unmarshal(AppConfig); err != nil {
		log.Fatalf("Error unmarshalling config: %v", err)
	}

	initMysql()
	initRedis()
}


// db.go
package config

import (
	"fmt"
	"honey_back/internal/global"
	"honey_back/internal/query"
	"log"

	"github.com/redis/go-redis/v9"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type MySQLConfig struct {
	Host     string `yaml:"host"`
	Port     string `yaml:"port"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	Dbname   string `yaml:"dbname"`
}

type RedisConfig struct {
	Address string `yaml:"address"`
	Pwd     string `yaml:"pwd"`
}

func initMysql() {
	mysqlCfg := AppConfig.Database.Mysql
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		mysqlCfg.User,
		mysqlCfg.Password,
		mysqlCfg.Host,
		mysqlCfg.Port,
		mysqlCfg.Dbname,
	)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("[SERVER] MySQL is not connected! ", err)
	}

	global.Db = db
	global.Gen = query.Use(db)
	log.Println("[SERVER] MySQL is connected!")
}

func initRedis() {
	redisCfg := AppConfig.Database.Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisCfg.Address,
		Password: redisCfg.Pwd,
		DB:       0,
	})
	global.Rdb = rdb
	log.Println("[SERVER] Redis is connected!")
}

~~~

### Response构建
~~~go
package res

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func response(c *gin.Context, status int, r Response) {
	c.JSON(status, r)
}

// OkWithData 成功响应数据
func OkWithData(c *gin.Context, data interface{}) {
	response(c, http.StatusOK, Response{
		Code:    0,
		Data:    data,
		Message: "",
	})
}

// OkWithMes 成功响应信息
func OkWithMes(c *gin.Context, data interface{}, message string) {
	response(c, http.StatusOK, Response{
		Code:    0,
		Data:    data,
		Message: message,
	})
}

// Error 响应错误消息
func Error(c *gin.Context, code int, err string) {
	response(c, http.StatusOK, Response{
		Code:    code,
		Data:    nil,
		Message: err,
	})
}

~~~