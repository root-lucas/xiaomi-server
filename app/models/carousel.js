const db = require('./db.js')

class CarouselMtl {
    // 连接数据库获取轮播图数据
    async M_Carousel() {
        const sql = 'select * from carousel'
        return await db.query(sql, [])
    }
}

module.exports = new CarouselMtl()
