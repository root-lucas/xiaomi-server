const router = require('koa-router')()

const { testLogin } = require('../controllers/user')

// 用户登陆测试
router.post('/users/login', testLogin)

module.exports = router
