const db = require('./db.js')

class CollectMtl {
    // 连接数据库,把收藏商品信息插入数据库
    async MAddCollect(user_id, product_id, timeTemp) {
        const sql = 'insert into collect values(null,?,?,?)'
        return await db.query(sql, [user_id, product_id, timeTemp])
    }

    // 连接数据库,获取用户的所有收藏商品信息
    async MGetCollect(user_id) {
        const sql = 'select * from collect where user_id=?'
        return await db.query(sql, user_id)
    }

    // 连接数据库,获取用户的某个收藏商品信息
    async MFindCollect(user_id, product_id) {
        const sql = 'select * from collect where user_id=? and product_id=?'
        return await db.query(sql, [user_id, product_id])
    }

    // 连接数据库,删除用户的某个收藏商品信息
    async MDeleteCollect(user_id, product_id) {
        const sql = 'delete from collect where user_id=? and product_id=?'
        return await db.query(sql, [user_id, product_id])
    }
}

module.exports = new CollectMtl()
