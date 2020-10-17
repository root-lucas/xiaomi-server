// 校验用户是否登录
module.exports = async function (ctx, next) {
    let { user_id = '' } = ctx.request.body
    // console.log('session = ', ctx.session)
    // 判断请求传递的用户id 与 session中的用户id是否一致
    if (user_id != ctx.session.user.user_id) {
        ctx.body = {
            code: '401',
            msg: '用户名没有登录，请登录后再操作',
        }
        return false
    }

    await next()
}
