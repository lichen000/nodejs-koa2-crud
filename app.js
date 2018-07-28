"use strict";

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const routing = require("./routing");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(routing());

// 在端口9307监听:
app.listen(9307);
console.log('app started at port 9307...');

/**
 * 把一个日期变量按照给定格式输出
 * @param format
 * @param date
 * @returns {string}
 */
function dateFormat(date, format) {
    let obj = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1, //月份
        day: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        hour: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minite: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        second: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    };
    if (format === null || format === undefined || format === "yyyy-MM-dd HH:mm:ss") {
        return obj.year + "-" + obj.month + "-" + obj.day
            + " "
            + obj.hour + ":" + obj.minite + ":" + obj.second;
    } else if (format === "yyyy-MM-dd") {
        return obj.year + "-" + obj.month + "-" + obj.day;
    } else if (format === "yyyyMMdd") {
        return obj.year + obj.month + obj.day;
    } else {
        throw new Error("format not supported");
    }
}

Date.prototype.toJSON = function () {
    return dateFormat(this,'yyyy-MM-dd HH:mm:ss')
};