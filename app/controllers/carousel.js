const { MCarousel } = require('../models/carousel')

class CarouselCtl {
    // 获取轮播图数据
    async Carousel(ctx) {
        let carousel = await MCarousel()
        ctx.body = {
            code: '001',
            carousel,
        }
    }
}

module.exports = new CarouselCtl()
