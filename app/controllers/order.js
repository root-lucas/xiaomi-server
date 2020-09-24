const { M_GetOrder, M_GetOrderGroup, M_AddOrder, M_DeleteOrder, M_FindOrder } = require('../models/order')
const { M_GetProductById } = require('../models/product')
const { M_DeleteShoppingCart } = require('../models/shoppingCart')

class OrderCtl {
    // 获取用户的所有订单信息
    async getOrder(ctx) {
        let { user_id } = ctx.request.body

        // 获取所有的订单id
        const ordersGroup = await M_GetOrderGroup(user_id)

        // 该用户没有订单,直接返回信息
        if (ordersGroup.length == 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有订单信息',
            }
            return
        }

        // 获取所有的订单详细信息
        const orders = await M_GetOrder(user_id)

        let ordersList = []
        // 生成每个订单的详细信息列表
        for (let i = 0; i < ordersGroup.length; i++) {
            const orderID = ordersGroup[i]
            let tempOrder = []

            for (let j = 0; j < orders.length; j++) {
                const order = orders[j]

                if (orderID.order_id == order.order_id) {
                    // 获取每个商品详细信息
                    const product = await M_GetProductById(order.product_id)
                    order.product_name = product[0].product_name
                    order.product_picture = product[0].product_picture

                    tempOrder.push(order)
                }
            }
            ordersList.push(tempOrder)
        }

        ctx.body = {
            code: '001',
            orders: ordersList,
        }
    }

    // 添加用户订单信息
    async addOrder(ctx) {
        let { user_id, products } = ctx.request.body

        // 获取当前时间戳
        const timeTemp = new Date().getTime()
        // 生成订单id：用户id+时间戳(string)
        const orderID = +('' + user_id + timeTemp)

        let data = []
        // 根据数据库表结构生成字段信息
        for (let i = 0; i < products.length; i++) {
            const temp = products[i]
            let product = [orderID, user_id, temp.productID, temp.num, temp.price, timeTemp]
            data.push(...product)
        }

        try {
            // 把订单信息插入数据库
            const result = await M_AddOrder(products.length, data)

            // 插入成功
            if (result.affectedRows == products.length) {
                //下单后删除对应购物车商品
                let rows = 0
                for (let i = 0; i < products.length; i++) {
                    const temp = products[i]
                    const res = await M_DeleteShoppingCart(user_id, temp.productID)
                    rows += res.affectedRows
                }
                //判断删除购物车是否成功
                if (rows != products.length) {
                    ctx.body = {
                        code: '002',
                        msg: '购买成功,但购物车没有更新成功',
                    }
                    return
                }

                ctx.body = {
                    code: '001',
                    msg: '购买成功',
                }
            } else {
                ctx.body = {
                    code: '004',
                    msg: '购买失败,未知原因',
                }
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                code: '500',
                msg: '服务器未知错误',
            }
        }
    }

    // 删除订单
    async deleteOrder(ctx) {
        let { user_id, order_id } = ctx.request.body

        // 判断该用户的订单列表是否存在该订单
        let tempOrder = await M_FindOrder(user_id, order_id)

        if (tempOrder.length > 0) {
            // 如果存在则删除
            try {
                const result = await M_DeleteOrder(user_id, order_id)
                // 判断是否删除成功
                if (result.affectedRows >= 1) {
                    ctx.body = {
                        code: '001',
                        msg: '删除订单成功',
                    }
                    return
                }
            } catch (error) {
                console.log(error)
                // 不存在则返回信息
                ctx.body = {
                    code: '500',
                    msg: '服务器未知错误',
                }
            }
        } else {
            // 不存在则返回信息
            ctx.body = {
                code: '002',
                msg: '该订单不在订单列表',
            }
        }
    }
}

module.exports = new OrderCtl()
