// 请求体配置
const koaBodyConfig = {
    multipart: true, // 支持文件上传
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
    formidable: {
        keepExtensions: true, // 保留原来的文件后缀
    },
}

// 数据库连接设置
const DBConfig = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // 登陆账号
    password: 'admin', // 登陆密码
    database: 'storedb',
}

module.exports = {
    koaBodyConfig,
    DBConfig,
}
