const db = require('./db.js')

class CartMtl {
    // Linux部署默认区分表明大小写
    // 新插入购物车信息
    async M_AddShoppingCart(user_id, product_id) {
        const sql = 'insert into shoppingcart values(null,?,?,1)'
        return await db.query(sql, [user_id, product_id])
    }

    // 获取购物车信息
    async M_GetShoppingCart(user_id) {
        const sql = 'select * from shoppingcart where user_id = ?'
        return await db.query(sql, user_id)
    }

    // 查询用户的购物车的某个商品
    async M_FindShoppingCart(user_id, product_id) {
        const sql = 'select * from shoppingcart where user_id = ? and product_id = ?'
        return await db.query(sql, [user_id, product_id])
    }

    // 更新购物车商品数量
    async M_UpdateShoppingCart(NewNum, user_id, product_id) {
        const sql = 'update shoppingcart set num =? where user_id =? and product_id =?'
        return await db.query(sql, [NewNum, user_id, product_id])
    }

    // 删除购物车信息
    async M_DeleteShoppingCart(user_id, product_id) {
        const sql = 'delete from shoppingcart where user_id =? and product_id =?'
        return await db.query(sql, [user_id, product_id])
    }
}

module.exports = new CartMtl()
