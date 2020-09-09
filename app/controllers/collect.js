const { M_AddCollect, M_FindCollect, M_GetCollect, M_DeleteCollect } = require('../models/collect')
const checkLogin = require('../middlewares/checkLogin')
const { M_GetProductById } = require('../models/product')

class CollectCtl {
    // 添加收藏
    async addCollect(ctx) {
        let { user_id, product_id } = ctx.request.body

        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }

        // 判断该用户的收藏列表是否存在该商品
        let tempCollect = await M_FindCollect(user_id, product_id)

        if (tempCollect.length > 0) {
            ctx.body = {
                code: '003',
                msg: '该商品已经添加收藏，请到我的收藏查看',
            }
            return
        }

        // 获取当前时间戳
        const timeTemp = new Date().getTime()
        try {
            // 把收藏商品信息插入数据库
            const result = await M_AddCollect(user_id, product_id, timeTemp)
            // 插入成功
            if (result.affectedRows === 1) {
                ctx.body = {
                    code: '001',
                    msg: '添加收藏成功',
                }
                return
            }
        } catch (error) {
            reject(error)
        }

        ctx.body = {
            code: '002',
            msg: '添加收藏失败',
        }
    }

    // 获取用户的所有收藏商品信息
    async getCollect(ctx) {
        let { user_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }
        // 获取所有收藏信息
        const collect = await M_GetCollect(user_id)

        // 该用户没有收藏的商品,直接返回信息
        if (collect.length == 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有收藏的商品',
            }
            return
        }

        let collectList = []
        // 生成收藏商品的详细信息列表
        for (let i = 0; i < collect.length; i++) {
            const temp = collect[i]
            // 获取每个商品详细信息
            const product = await M_GetProductById(temp.product_id)
            collectList.push(product[0])
        }

        ctx.body = {
            code: '001',
            collectList: collectList,
        }
    }

    // 删除用户的收藏商品信息
    async deleteCollect(ctx) {
        let { user_id, product_id } = ctx.request.body
        // 校验用户是否登录
        if (!checkLogin(ctx, user_id)) {
            return
        }

        // 判断该用户的收藏列表是否存在该商品
        let tempCollect = await M_FindCollect(user_id, product_id)

        if (tempCollect.length > 0) {
            // 如果存在则删除
            try {
                const result = await M_DeleteCollect(user_id, product_id)
                // 判断是否删除成功
                if (result.affectedRows === 1) {
                    ctx.body = {
                        code: '001',
                        msg: '删除收藏成功',
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
                msg: '该商品不在收藏列表',
            }
        }
    }
}

module.exports = new CollectCtl()
