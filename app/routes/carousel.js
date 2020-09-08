const router = require('koa-router')()
const { Carousel } = require('../controllers/carousel')

router.post('/resources/carousel', Carousel)

module.exports = router
