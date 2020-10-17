// 全局错误处理中间件
// 暂时替代koa-onerror中间件,不会客户控制台显示而是直接反馈给用户错误信息

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: '500',
            msg: '服务器未知错误',
        }
    }
}
