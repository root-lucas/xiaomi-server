const router = require('koa-router')()
const { addCollect, getCollect, deleteCollect } = require('../controllers/collect')
const checkLogin = require('../middlewares/checkLogin')

// 商品添加收藏
router.post('/user/collect/addCollect', checkLogin, addCollect)

// 获取收藏列表
router.post('/user/collect/getCollect', checkLogin, getCollect)

// 删除特定收藏
router.post('/user/collect/deleteCollect', checkLogin, deleteCollect)

module.exports = router
