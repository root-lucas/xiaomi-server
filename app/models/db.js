var mysql = require('mysql')
const { DBConfig } = require('../conf/config')
var pool = mysql.createPool(DBConfig)

var db = {}

db.query = function (sql, params) {
    return new Promise((resolve, reject) => {
        // 取出链接
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return
            }

            connection.query(sql, params, function (error, results, fields) {
                console.log(`${sql}=>${params}`)
                // 释放连接
                connection.release()
                if (error) {
                    reject(error)
                    return
                }
                resolve(results)
            })
        })
    })
}
// 导出对象
module.exports = db
