const Koa = require('koa')
const app = new Koa()
const koaStatic = require('koa-static')
const KoaBody = require('koa-body')
// const onerror = require('koa-onerror')
const path = require('path')
const session = require('koa-generic-session')

const routing = require('./routes/index')
const { koaBodyConfig } = require('./conf/config')
const { SESSION_CONF, SESSION_SECRET_KEY } = require('./conf/session')

// onerror(app)
const error = require('./middlewares/error')
app.use(error)

// 处理静态资源链接使图片可访问
app.use(koaStatic(path.join(__dirname, '../')))

// session 配置, 需开启本地 redis 服务器
app.keys = [SESSION_SECRET_KEY]
app.use(session(SESSION_CONF))

// 判断是否登录
const isLogin = require('./middlewares/isLogin')
// 必须在前面的 session 设置后执行, 如果没登录则直接返回401不再往下执行
app.use(isLogin)
app.use(async (ctx, next) => {
    ctx.state.user = ctx.session.user
    await next()
})

// 处理请求体数据
app.use(KoaBody(koaBodyConfig))

// 处理路由
routing(app)

app.listen(3000, () => console.log('已经打开3000端口'))
