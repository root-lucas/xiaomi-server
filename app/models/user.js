const db = require('./db.js')

class UserMtl {
    // 连接数据库插入用户信息
    async testLogin(userName, password) {
        const sql = 'select * from users where userName = ? and password = ?'
        return await db.query(sql, [userName, password])
    }
}

module.exports = new UserMtl()
