const router = require('koa-router')()
const { addCollect, getCollect, deleteCollect } = require('../controllers/collect')

// 商品添加收藏
router.post('/user/collect/addCollect', addCollect)

// 获取收藏列表
router.post('/user/collect/getCollect', getCollect)

// 删除特定收藏
router.post('/user/collect/deleteCollect', deleteCollect)

module.exports = router
