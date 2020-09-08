const router = require('koa-router')()
const { GetShoppingCart, AddShoppingCart, UpdateShoppingCart, DeleteShoppingCart } = require('../controllers/shopingCart')

// 获取购物车信息
router.post('/user/shoppingCart/getShoppingCart', GetShoppingCart)

// 插入购物车信息
router.post('/user/shoppingCart/addShoppingCart', AddShoppingCart)

// 更新购物车商品数量
router.post('/user/shoppingCart/updateShoppingCart', UpdateShoppingCart)

// 删除购物车信息
router.post('/user/shoppingCart/deleteShoppingCart', DeleteShoppingCart)

module.exports = router
