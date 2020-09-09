const router = require('koa-router')()

const { getOrder, addOrder, deleteOrder } = require('../controllers/order')

// 查询某用户全部订单
router.post('/user/order/getOrder', getOrder)
// 添加订单
router.post('/user/order/addOrder', addOrder)
// 删除订单
router.post('/user/order/deleteOrder', deleteOrder)

module.exports = router
