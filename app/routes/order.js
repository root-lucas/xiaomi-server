const router = require('koa-router')()

const { getOrder, addOrder } = require('../controllers/order')

// 查询某用户全部订单
router.post('/user/order/getOrder', getOrder)
// 添加订单
router.post('/user/order/addOrder', addOrder)

module.exports = router
