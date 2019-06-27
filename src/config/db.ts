/**
 * 数据库配置
 */

const mysql = require('mysql2/promise');

// 创建一个默认配置的连接池
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bstek',
    database: 'db_test1',
    charset: 'utf8',
    waitForConnections: true, //为true时，连接排队等待可用连接。为false将立即抛出错误
    connectionLimit: 10, //单次可创建最大连接数
    queueLimit: 10, //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
    connectTimeout: 10000
});

export { db };