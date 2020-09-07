// 请求体配置
const koaBodyConfig = {
    multipart: true, // 支持文件上传
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
    formidable: {
        keepExtensions: true, // 保留原来的文件后缀
    },
}

module.exports = {
    koaBodyConfig,
}
