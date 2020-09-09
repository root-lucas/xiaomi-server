const {
    M_AddShoppingCart,
    M_GetShoppingCart,
    M_FindShoppingCart,
    M_UpdateShoppingCart,
    M_DeleteShoppingCart,
} = require('../models/shoppingCart')

const { M_GetProductById } = require('../models/product')
const checkLogin = require('../middlewares/checkLogin')

let methods = {
    // 生成购物车详细信息
    ShoppingCartData: async (data) => {
        let shoppingCartData = []
        for (let i = 0; i < data.length; i++) {
            const temp = data[i]
            const product = await M_GetProductById(temp.product_id)

            let shoppingCartDataTemp = {
                id: temp.id,
                productID: temp.product_id,
                productName: product[0].product_name,
                productImg: product[0].product_picture,
                price: product[0].product_selling_price,
                num: temp.num,
                maxNum: Math.floor(product[0].product_num / 2),
                check: false,
            }

            shoppingCartData.push(shoppingCartDataTemp)
        }
        return shoppingCartData
    },
}

class CartCtl {
    // 获取购物车信息
    async getShoppingCart(ctx) {
        let { user_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }
        // 获取购物车信息
        const shoppingCart = await M_GetShoppingCart(user_id)
        // 生成购物车详细信息
        const data = await methods.ShoppingCartData(shoppingCart)

        ctx.body = {
            code: '001',
            shoppingCartData: data,
        }
    }
    // 插入购物车信息
    async addShoppingCart(ctx) {
        let { user_id, product_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }

        let tempShoppingCart = await M_FindShoppingCart(user_id, product_id)
        //判断该用户的购物车是否存在该商品
        if (tempShoppingCart.length > 0) {
            //如果存在则把数量+1
            const tempNum = tempShoppingCart[0].num + 1

            const product = await M_GetProductById(tempShoppingCart[0].product_id)
            const maxNum = Math.floor(product[0].product_num / 2)
            //判断数量是否达到限购数量
            if (tempNum > maxNum) {
                ctx.body = {
                    code: '003',
                    msg: '数量达到限购数量 ' + maxNum,
                }
                return
            }

            try {
                // 更新购物车信息,把数量+1
                const result = await M_UpdateShoppingCart(tempNum, user_id, product_id)

                if (result.affectedRows === 1) {
                    ctx.body = {
                        code: '002',
                        msg: '该商品已在购物车，数量 +1',
                    }
                    return
                }
            } catch (error) {
                reject(error)
            }
        } else {
            //不存在则添加
            try {
                // 新插入购物车信息
                const res = await M_AddShoppingCart(user_id, product_id)
                // 判断是否插入成功
                if (res.affectedRows === 1) {
                    // 如果成功,获取该商品的购物车信息
                    const shoppingCart = await M_FindShoppingCart(user_id, product_id)
                    // 生成购物车详细信息
                    const data = await methods.ShoppingCartData(shoppingCart)

                    ctx.body = {
                        code: '001',
                        msg: '添加购物车成功',
                        shoppingCartData: data,
                    }
                    return
                }
            } catch (error) {
                reject(error)
            }
        }

        ctx.body = {
            code: '005',
            msg: '添加购物车失败,未知错误',
        }
    }

    // 删除购物车信息
    async deleteShoppingCart(ctx) {
        let { user_id, product_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }

        // 判断该用户的购物车是否存在该商品
        let tempShoppingCart = await M_FindShoppingCart(user_id, product_id)

        if (tempShoppingCart.length > 0) {
            // 如果存在则删除
            try {
                const result = await M_DeleteShoppingCart(user_id, product_id)
                // 判断是否删除成功
                if (result.affectedRows === 1) {
                    ctx.body = {
                        code: '001',
                        msg: '删除购物车成功',
                    }
                    return
                }
            } catch (error) {
                reject(error)
            }
        } else {
            // 不存在则返回信息
            ctx.body = {
                code: '002',
                msg: '该商品不在购物车',
            }
        }
    }

    // 更新购物车商品数量
    async updateShoppingCart(ctx) {
        let { user_id, product_id, num } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }
        // 判断数量是否小于1
        if (num < 1) {
            ctx.body = {
                code: '004',
                msg: '数量不合法',
            }
            return
        }
        // 判断该用户的购物车是否存在该商品
        let tempShoppingCart = await M_FindShoppingCart(user_id, product_id)

        if (tempShoppingCart.length > 0) {
            // 如果存在则修改

            // 判断数量是否有变化
            if (tempShoppingCart[0].num == num) {
                ctx.body = {
                    code: '003',
                    msg: '数量没有发生变化',
                }
                return
            }
            const product = await M_GetProductById(product_id)
            const maxNum = Math.floor(product[0].product_num / 2)
            // 判断数量是否达到限购数量
            if (num > maxNum) {
                ctx.body = {
                    code: '004',
                    msg: '数量达到限购数量 ' + maxNum,
                }
                return
            }

            try {
                // 修改购物车信息
                const result = await M_UpdateShoppingCart(num, user_id, product_id)
                // 判断是否修改成功
                if (result.affectedRows === 1) {
                    ctx.body = {
                        code: '001',
                        msg: '修改购物车数量成功',
                    }
                    return
                }
            } catch (error) {
                reject(error)
            }
        } else {
            //不存在则返回信息
            ctx.body = {
                code: '002',
                msg: '该商品不在购物车',
            }
        }
    }
}

module.exports = new CartCtl()
