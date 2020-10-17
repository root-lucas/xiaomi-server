// 全局登录拦截器

module.exports = async (ctx, next) => {
    // 遇见以/user/请求开头的api则验证
    if (ctx.url.startsWith('/user/')) {
        // 验证请求来源是否登录(每个api请求都会自动附带cookie)
        if (!ctx.session.user) {
            ctx.body = {
                code: '401',
                msg: '用户没有登录，请登录后再操作',
            }
            return
        }
    }
    await next()
}
