const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    console.log('ctx.body = ', ctx.request.body) // 请使用postman测试
    ctx.body = ctx.request.body
})

module.exports = router
