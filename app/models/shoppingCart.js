const db = require('./db.js')

class CartMtl {
    // 新插入购物车信息
    async MAddShoppingCart(user_id, product_id) {
        const sql = 'insert into shoppingCart values(null,?,?,1)'
        return await db.query(sql, [user_id, product_id])
    }

    // 获取购物车信息
    async MGetShoppingCart(user_id) {
        const sql = 'select * from shoppingCart where user_id = ?'
        return await db.query(sql, user_id)
    }

    // 查询用户的购物车的某个商品
    async MFindShoppingCart(user_id, product_id) {
        const sql = 'select * from shoppingCart where user_id = ? and product_id = ?'
        return await db.query(sql, [user_id, product_id])
    }

    // 更新购物车商品数量
    async MUpdateShoppingCart(NewNum, user_id, product_id) {
        const sql = 'update shoppingCart set num =? where user_id =? and product_id =?'
        return await db.query(sql, [NewNum, user_id, product_id])
    }

    // 删除购物车信息
    async MDeleteShoppingCart(user_id, product_id) {
        const sql = 'delete from shoppingCart where user_id =? and product_id =?'
        return await db.query(sql, [user_id, product_id])
    }
}

module.exports = new CartMtl()
