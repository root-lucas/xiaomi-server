const { M_GetOrder, M_GetOrderGroup, M_AddOrder } = require('../models/order')
const { M_GetProductById } = require('../models/product')
const { M_DeleteShoppingCart } = require('../models/shoppingCart')
const checkLogin = require('../middlewares/checkLogin')

class OrderCtl {
    // 获取用户的所有订单信息
    async getOrder(ctx) {
        let { user_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }
        console.log('=====1================', user_id)

        // 获取所有的订单id
        const ordersGroup = await M_GetOrderGroup(user_id)
        console.log('=====2================', ordersGroup)

        // 该用户没有订单,直接返回信息
        if (ordersGroup.length == 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有订单信息',
            }
            return
        }
        console.log('=====3================', user_id)

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
        console.log('=====4================', user_id)

        ctx.body = {
            code: '001',
            orders: ordersList,
        }
    }

    // 添加用户订单信息
    async addOrder(ctx) {
        let { user_id, products } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }

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
}

module.exports = new OrderCtl()
