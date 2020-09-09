const { M_UserRegister, M_UserLogin, M_HasUserName } = require('../models/user')
const { checkUserInfo, checkUserName } = require('../middlewares/checkUserInfo')

class UsersCtl {
    // 注册用户
    async register(ctx) {
        let { userName, password } = ctx.request.body

        // 校验用户信息是否符合规则
        if (!checkUserInfo(ctx, userName, password)) {
            return
        }

        // 连接数据库根据用户名查询用户信息
        // 先判断该用户是否存在

        let user = await M_HasUserName(userName)
        if (user.length !== 0) {
            ctx.body = {
                code: '004',
                msg: '用户名已经存在，不能注册',
            }
            return
        }

        try {
            // 连接数据库插入用户信息
            let registerResult = await M_UserRegister(userName, password)
            // 操作所影响的记录行数为1,则代表注册成功
            if (registerResult.affectedRows === 1) {
                ctx.body = {
                    code: '001',
                    msg: '注册成功',
                }
                return
            }
        } catch (error) {
            console.error(error)
            // 否则失败
            ctx.body = {
                code: '500',
                msg: '未知错误，注册失败',
            }
        }
    }

    // 登陆用户
    async login(ctx) {
        let { userName, password } = ctx.request.body
        console.log('this', this)
        // 校验用户信息是否符合规则
        if (!checkUserInfo(ctx, userName, password)) {
            return
        }
        // 连接数据库根据用户名和密码查询用户信息
        let user = await M_UserLogin(userName, password)
        // 结果集长度为0则代表没有该用户
        if (user.length === 0) {
            ctx.body = {
                code: '004',
                msg: '用户名或密码错误',
            }
            return
        }

        // 数据库设置用户名唯一
        // 结果集长度为1则代表存在该用户
        if (user.length === 1) {
            const loginUser = {
                user_id: user[0].user_id,
                userName: user[0].userName,
            }
            // 保存用户信息到session
            ctx.session.user = loginUser

            ctx.body = {
                code: '001',
                user: loginUser,
                msg: '登录成功',
            }
            return
        }

        //数据库设置用户名唯一
        //若存在user.length != 1 || user.length!=0
        //返回未知错误
        //正常不会出现
        ctx.body = {
            code: '500',
            msg: '未知错误',
        }
    }

    // 查询用户名是否存在
    async findUserName(ctx) {
        let { userName } = ctx.request.body

        // 校验用户名是否符合规则
        if (!checkUserName(ctx, userName)) {
            return
        }
        // 连接数据库根据用户名查询用户信息
        let user = await M_HasUserName(userName)
        // 结果集长度为0则代表不存在该用户,可以注册
        if (user.length === 0) {
            ctx.body = {
                code: '001',
                msg: '用户名不存在，可以注册',
            }
            return
        }

        //数据库设置用户名唯一
        //结果集长度为1则代表存在该用户,不可以注册
        if (user.length === 1) {
            ctx.body = {
                code: '004',
                msg: '用户名已经存在，不能注册',
            }
            return
        }

        //数据库设置用户名唯一，
        //若存在user.length != 1 || user.length!=0
        //返回未知错误
        //正常不会出现
        ctx.body = {
            code: '500',
            msg: '未知错误',
        }
    }
}

module.exports = new UsersCtl()
