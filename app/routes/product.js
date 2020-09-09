const router = require('koa-router')()

const {
    getAllProduct,
    getCategory,
    getPromoProduct,
    getHotProduct,
    getDetails,
    getDetailsPicture,
    getProductBySearch,
    getProductByCategory,
} = require('../controllers/product')

// 获取所有的商品信息
router.post('/product/getAllProduct', getAllProduct)
// 获取商品分类
router.post('/product/getCategory', getCategory)
// 获取商品分类数据
router.post('/product/getPromoProduct', getPromoProduct)
// 获取热门商品信息
router.post('/product/getHotProduct', getHotProduct)
// 获取商品详细信息
router.post('/product/getDetails', getDetails)
// 根据商品id,获取商品图片
router.post('/product/getDetailsPicture', getDetailsPicture)
// 搜索商品数据
router.post('/product/getProductBySearch', getProductBySearch)
// 根据分类id,分页获取商品信息
router.post('/product/getProductByCategory', getProductByCategory)

module.exports = router
