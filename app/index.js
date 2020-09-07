const Koa = require('koa')
const app = new Koa()
const koaStatic = require('koa-static')
const KoaBody = require('koa-body')
const onerror = require('koa-onerror')
const path = require('path')

const user = require('./routes/user')
const { koaBodyConfig } = require('./conf/config')

onerror(app)

// 处理静态资源链接使图片可访问
app.use(koaStatic(path.join(__dirname, '../')))

// 处理请求体数据
app.use(KoaBody(koaBodyConfig))

app.use(user.routes(), user.allowedMethods())

app.listen(3000, () => console.log('已经打开3000端口'))
