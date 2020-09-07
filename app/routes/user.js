const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.body = {
        msg: 'lucas',
    }
})

// session 测试
router.get('/session-test', async (ctx, next) => {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount,
    }
})

module.exports = router
