const router = require('koa-router')()
const { AddCollect, GetCollect, DeleteCollect } = require('../controllers/collect')

router.post('/user/collect/addCollect', AddCollect)
router.post('/user/collect/getCollect', GetCollect)
router.post('/user/collect/deleteCollect', DeleteCollect)

module.exports = router
