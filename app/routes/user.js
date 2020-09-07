const router = require('koa-router')()

const { register, login, findUserName } = require('../controllers/user')

// 注册用户
router.post('/users/register', register)
// 登陆用户
router.post('/users/login', login)
// 查询用户名是否存在
router.post('/users/findUserName', findUserName)

module.exports = router
