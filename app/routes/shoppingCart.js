const router = require('koa-router')()
const { getShoppingCart, addShoppingCart, updateShoppingCart, deleteShoppingCart } = require('../controllers/shopingCart')
const checkLogin = require('../middlewares/checkLogin')

// 获取购物车信息
router.post('/user/shoppingCart/getShoppingCart', checkLogin, getShoppingCart)

// 插入购物车信息
router.post('/user/shoppingCart/addShoppingCart', checkLogin, addShoppingCart)

// 更新购物车商品数量
router.post('/user/shoppingCart/updateShoppingCart', checkLogin, updateShoppingCart)

// 删除购物车信息
router.post('/user/shoppingCart/deleteShoppingCart', checkLogin, deleteShoppingCart)

module.exports = router
