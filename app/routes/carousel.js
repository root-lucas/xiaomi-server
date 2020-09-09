const router = require('koa-router')()
const { carousel } = require('../controllers/carousel')

// 主页轮播图
router.post('/resources/carousel', carousel)

module.exports = router
