const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.body = {
        msg: 'hello lucas',
    }
})

module.exports = router
