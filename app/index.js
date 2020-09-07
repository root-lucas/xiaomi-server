const Koa = require('koa')
const app = new Koa()
const koaStatic = require('koa-static')
const KoaBody = require('koa-body')
const onerror = require('koa-onerror')
const path = require('path')
const session = require('koa-generic-session')

const routing = require('./routes/index')
const { koaBodyConfig } = require('./conf/config')
const { SESSION_CONF, SESSION_SECRET_KEY } = require('./conf/session')

onerror(app)

// 处理静态资源链接使图片可访问
app.use(koaStatic(path.join(__dirname, '../')))

// 处理请求体数据
app.use(KoaBody(koaBodyConfig))

// session 配置, 需开启本地 redis 服务器
app.keys = [SESSION_SECRET_KEY]
app.use(session(SESSION_CONF))

// 处理路由
routing(app)

app.listen(3000, () => console.log('已经打开3000端口'))
