const router = require('koa-router')()

const { getOrder, addOrder, deleteOrder } = require('../controllers/order')
const checkLogin = require('../middlewares/checkLogin')

// 查询某用户全部订单
router.post('/user/order/getOrder', checkLogin, getOrder)
// 添加订单
router.post('/user/order/addOrder', checkLogin, addOrder)
// 删除订单
router.post('/user/order/deleteOrder', checkLogin, deleteOrder)

module.exports = router
