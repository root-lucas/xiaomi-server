const {
    M_GetAllProduct,
    M_GetCategory,
    M_GetCategoryId,
    M_GetProductById,
    M_GetDetailsPicture,
    M_GetProductByCategory,
    MGetProductBySearch,
} = require('../models/product')

class ProductCtl {
    // 分页获取所有的商品信息
    async getAllProduct(ctx) {
        let { currentPage, pageSize } = ctx.request.body
        // 计算开始索引
        const offset = (currentPage - 1) * pageSize
        const Product = await M_GetAllProduct(offset, pageSize)
        // 获取所有的商品数量,用于前端分页计算
        const total = (await M_GetAllProduct()).length
        ctx.body = {
            code: '001',
            Product,
            total,
        }
    }

    // 获取商品分类
    async getCategory(ctx) {
        const category = await M_GetCategory()

        ctx.body = {
            code: '001',
            category,
        }
    }

    // 根据商品分类名称获取首页展示的商品信息
    async getPromoProduct(ctx) {
        let { categoryName } = ctx.request.body
        // 根据商品分类名称获取分类id
        const categoryID = await M_GetCategoryId(categoryName)
        // 根据商品分类id获取首页展示的商品信息
        const Product = await M_GetProductByCategory(categoryID)

        ctx.body = {
            code: '001',
            Product,
        }
    }

    // 根据商品分类名称获取热门商品信息
    async getHotProduct(ctx) {
        let { categoryName } = ctx.request.body
        const categoryID = []

        for (let i = 0; i < categoryName.length; i++) {
            // 根据商品分类名称获取分类id
            const category_id = await M_GetCategoryId(categoryName[i])
            categoryID.push(category_id)
        }
        // 根据商品分类id获取商品信息
        const Product = await M_GetProductByCategory(categoryID, 0, 7)

        ctx.body = {
            code: '001',
            Product,
        }
    }

    // 根据商品id,获取商品详细信息
    async getDetails(ctx) {
        let { productID } = ctx.request.body
        const Product = await M_GetProductById(productID)
        ctx.body = {
            code: '001',
            Product,
        }
    }

    // 根据商品id,获取商品图片,用于商品详情的页面展示
    async getDetailsPicture(ctx) {
        let { productID } = ctx.request.body
        const ProductPicture = await M_GetDetailsPicture(productID)
        ctx.body = {
            code: '001',
            ProductPicture,
        }
    }

    // 根据分类id,分页获取商品信息
    async getProductByCategory(ctx) {
        let { categoryID, currentPage, pageSize } = ctx.request.body
        // 计算开始索引
        const offset = (currentPage - 1) * pageSize
        // 分页获取该分类的商品信息
        const Product = await M_GetProductByCategory(categoryID, offset, pageSize)
        // 获取该分类所有的商品数量,用于前端分页计算
        const total = (await M_GetProductByCategory(categoryID)).length

        ctx.body = {
            code: '001',
            Product,
            total,
        }
    }

    // 根据搜索条件,分页获取商品信息
    async getProductBySearch(ctx) {
        let { search, currentPage, pageSize } = ctx.request.body
        // 计算开始索引
        const offset = (currentPage - 1) * pageSize
        // 获取分类列表
        const category = await M_GetCategory()

        let Product
        let total

        for (let i = 0; i < category.length; i++) {
            // 如果搜索条件为某个分类名称,直接返回该分类的商品信息
            if (search == category[i].category_name) {
                // 获取该分类的商品信息
                Product = await M_GetProductByCategory(category[i].category_id, offset, pageSize)
                // 获取该分类所有的商品数量,用于前端分页计算
                total = (await M_GetProductByCategory(category[i].category_id)).length

                ctx.body = {
                    code: '001',
                    Product,
                    total,
                }
                return
            }
        }
        // 否则返回根据查询条件模糊查询的商品分页结果
        Product = await M_GetProductBySearch(search, offset, pageSize)
        // 获取模糊查询的商品结果总数
        total = (await M_GetProductBySearch(search)).length

        ctx.body = {
            code: '001',
            Product,
            total,
        }
    }
}

module.exports = new ProductCtl()
