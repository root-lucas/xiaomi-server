const redisStore = require('koa-redis')

// 配置完下面后需访问设置了 ctx.session.variable 的相应路由内才会返回 cookie 到客户端
const SESSION_CONF = {
    // key: 'mi.sid', // cookie name 默认是 ‘koa.sid’
    // prefix: 'mi:sess:', // redis key 的前缀，默认是 ‘koa:sess:’
    // 配置 cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 有效期一天
    },
    // 配置 redis, 需开启本地的 redis 服务器
    store: redisStore({
        // all: '127.0.0.1:6379',
        host:'127.0.0.1',
        port:6379,
        password:'12345'
    }),
}

const SESSION_SECRET_KEY = 'hello_lucas'

module.exports = {
    SESSION_CONF,
    SESSION_SECRET_KEY,
}
