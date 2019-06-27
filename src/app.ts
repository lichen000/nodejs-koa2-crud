/**
 * 主js，启动项目和服务器
 */

const Koa = require('koa'); // 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const bodyParser = require('koa-bodyparser');
const routing = require("./routing");

import { LOGGER } from './common/utils/logUtil';
import { CommonResult } from './common/dto/commonResult';

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());

app.use(async (ctx: any, next: any) => {
    try {
        await next();
    } catch (err) {
        let commonResult = new CommonResult();
        commonResult.code = err.statusCode || err.status || 500;
        commonResult.message = err.message;
        ctx.response.body = commonResult;
    }
});

// 对于任何请求，app将调用该异步函数处理请求：
app.use(routing());

// 服务器端口:
app.listen(9307);
LOGGER.info('server started at port 9307...');
LOGGER.error('kkkkk');

/**
 * 把一个日期变量按照给定格式输出
 * @param date 日期变量
 * @param format 日期格式
 * @returns {string}
 */
function dateFormat(date: Date, format: string): string {
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
        return obj.year + "" + obj.month + obj.day;
    } else {
        throw new Error("format not supported");
    }
}

Date.prototype.toJSON = function () {
    return dateFormat(this, 'yyyy-MM-dd HH:mm:ss'); //给Date类型原型链赋值toJSON方法，这样接口返回时间格式自动变成yyyy-MM-dd HH:mm:ss
};