## 介绍

这是一个与对接前端 [vue-xiaomi 传送地址](https://github.com/root-lucas/vue-xiaomi) 实现的前后端分离项目。

本项目后端技术栈基于：`Node.js`、`Koa框架`、`Mysql`、`Redis`

## 运行项目

> Tip1：新建MySQL数据库名为`storedb`，后运行上述准备的`storedb.sql`文件将数据导入数据库。
>
> Tip2：运行项目前需开启本地的 mysql、redis 服务并配置`/app/config/config.js`的 mysql 登陆账号密码： 即可。

```js
1. Clone project

git clone https://github.com/root-lucas/vue-xiaomi

2. Project setup

cd store-server
yarn install

3. Run project

yarn run dev
```
