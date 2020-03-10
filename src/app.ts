/**
 * 主js，启动项目和服务器
 */

const Koa = require('koa'); // 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const bodyParser = require('koa-bodyparser');
const routing = require("./routing");

import { LOGGER } from './common/utils/logUtil';
import { CommonResult } from './common/dto/commonResult';
import { scheduleCenter } from './schedule/scheduleCenter'
import {CommonUtil} from './common/utils/commonUtil'
import {config} from './config/config'

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
const port = config.port;
app.listen(port);
LOGGER.info(`server started at ${port} ...`);

Date.prototype.toJSON = function () {
    return CommonUtil.dateFormat(this, 'yyyy-MM-dd HH:mm:ss'); //给Date类型原型链赋值toJSON方法，这样接口返回时间格式自动变成yyyy-MM-dd HH:mm:ss
};

scheduleCenter.start() //启动定时任务