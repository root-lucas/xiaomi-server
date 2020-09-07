const Koa = require('koa')
const app = new Koa()
const onerror = require('koa-onerror')

const user = require('./routes/user')

onerror(app)

app.use(user.routes(), user.allowedMethods())

app.listen(3000, () => console.log('已经打开3000端口'))
