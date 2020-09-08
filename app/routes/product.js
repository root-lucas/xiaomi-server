const router = require('koa-router')()

const {
    GetAllProduct,
    GetCategory,
    GetPromoProduct,
    GetHotProduct,
    GetDetails,
    GetDetailsPicture,
    GetProductBySearch,
    GetProductByCategory,
} = require('../controllers/product')

// 获取所有的商品信息
router.post('/product/getAllProduct', GetAllProduct)
// 获取商品分类
router.post('/product/getCategory', GetCategory)
// 获取商品分类数据
router.post('/product/getPromoProduct', GetPromoProduct)
// 获取热门商品信息
router.post('/product/getHotProduct', GetHotProduct)
// 获取商品详细信息
router.post('/product/getDetails', GetDetails)
// 根据商品id,获取商品图片
router.post('/product/getDetailsPicture', GetDetailsPicture)
// 搜索商品数据
router.post('/product/getProductBySearch', GetProductBySearch)
// 根据分类id,分页获取商品信息
router.post('/product/getProductByCategory', GetProductByCategory)

module.exports = router
