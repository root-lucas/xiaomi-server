const { M_Carousel } = require('../models/carousel')

class CarouselCtl {
    // 获取轮播图数据
    async carousel(ctx) {
        let carousel = await M_Carousel()
        ctx.body = {
            code: '001',
            carousel,
        }
    }
}

module.exports = new CarouselCtl()
