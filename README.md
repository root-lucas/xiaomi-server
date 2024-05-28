## 运行测试环境

```sh
win10
node v18.17.0
redis 5.0.14.1
mysql 8.0.31	(建议使用mysql 5.7版本,因为mysql 8.0及以上版本需修改验证插件加密规则才能连接成功)	

原因是：mysql8 之前的版本中加密规则是mysql_native_password,而在mysql8之后,加密规则是caching_sha2_password, 本项目依赖模块尚未兼容后者。

解决方法(进入mysql 8.x版本终端)：
mysql> ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'admin'; 	#修改为mysql 5.7版本加密规则
mysql> FLUSH PRIVILEGES; #刷新权限

项目配置信息修改文件: /app/conf/
```



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
