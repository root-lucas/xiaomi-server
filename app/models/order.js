const db = require('./db.js')

class OrderMtl {
    // 连接数据库获取所有的订单id
    async M_GetOrderGroup(user_id) {
        let sql = 'select order_id from orders where user_id = ? group by order_id  order by order_id desc'
        return await db.query(sql, user_id)
    }

    // 连接数据库获取所有的订单详细信息
    async M_GetOrder(user_id) {
        let sql = 'select * from orders where user_id =? order by order_time desc'
        return await db.query(sql, user_id)
    }

    // 连接数据库插入订单信息
    async M_AddOrder(length, data) {
        let sql = 'insert into orders values(null,?,?,?,?,?,?)'
        for (let i = 0; i < length - 1; i++) {
            sql += ',(null,?,?,?,?,?,?)'
        }

        return await db.query(sql, data)
    }

    // 连接数据库查询某个订单是否存在
    async M_FindOrder(user_id, order_id) {
        const sql = 'select * from orders where user_id = ? and order_id = ?'
        return await db.query(sql, [user_id, order_id])
    }

    // 连接数据库删除订单信息
    async M_DeleteOrder(user_id, order_id) {
        const sql = 'delete from orders where user_id =? and order_id =?'
        return await db.query(sql, [user_id, order_id])
    }
}

module.exports = new OrderMtl()
