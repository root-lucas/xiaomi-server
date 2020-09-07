const { testLogin } = require('../models/user')

class UsersCtl {
    async testLogin(ctx) {
        let { userName, password } = ctx.request.body

        let registerResult = await testLogin(userName, password)
        console.log('registerResult = ', registerResult)
        ctx.body = {
            code: '001',
            msg: '登录成功',
        }
    }
}

module.exports = new UsersCtl()
