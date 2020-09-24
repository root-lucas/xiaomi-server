const router = require('koa-router')()

const { register, login, findUserName } = require('../controllers/user')
const { checkUserInfo, checkUserName } = require('../middlewares/checkUserInfo')

// 注册用户
router.post('/users/register', checkUserInfo, register)
// 登陆用户
router.post('/users/login', checkUserInfo, login)
// 查询用户名是否存在
router.post('/users/findUserName', checkUserName, findUserName)

module.exports = router
