const router = require('koa-router')()
const { getShoppingCart, addShoppingCart, updateShoppingCart, deleteShoppingCart } = require('../controllers/shopingCart')

// 获取购物车信息
router.post('/user/shoppingCart/getShoppingCart', getShoppingCart)

// 插入购物车信息
router.post('/user/shoppingCart/addShoppingCart', addShoppingCart)

// 更新购物车商品数量
router.post('/user/shoppingCart/updateShoppingCart', updateShoppingCart)

// 删除购物车信息
router.post('/user/shoppingCart/deleteShoppingCart', deleteShoppingCart)

module.exports = router
