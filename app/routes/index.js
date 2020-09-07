/*
 * @Description  : 遍历routes目录全部文件（排除自身）并注册路由
 * @Author       : lucas
 */

const fs = require('fs')
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') {
            return
        }
        const route = require(`./${file}`)
        // 注册路由
        app.use(route.routes()).use(route.allowedMethods())
    })
}
