const db = require('./db.js')

class UserMtl {
    // 连接数据库插入用户信息
    async M_UserRegister(userName, password) {
        const sql = 'insert into users values(null,?,?,null)'
        return await db.query(sql, [userName, password])
    }

    // 连接数据库根据用户名和密码查询用户信息
    async M_UserLogin(userName, password) {
        const sql = 'select * from users where userName = ? and password = ?'
        return await db.query(sql, [userName, password])
    }

    // 连接数据库根据用户名查询用户信息
    async M_HasUserName(userName) {
        const sql = 'select * from users where userName = ?'
        return await db.query(sql, [userName])
    }
}

module.exports = new UserMtl()
