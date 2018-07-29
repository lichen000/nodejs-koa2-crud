"use strict";

const studentService = require('../service/studentService');
const CommonResult = require('../common/dto/commonResult');
const commonUtil = require('../common/utils/commonUtil');
const ApiStatusCode = require('../common/code/apiStatusCode');
// const CommonMessage = require('../common/code/commonMessage');
const LOGGER = require('../config/log');

let urlMapping = {

    preFix: "/api/student/",

    mapping: {

        /**
         *
         * @param ctx
         * @param next
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL get': async (ctx, next) => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let id = params.id;

            LOGGER.info("someone info visited get " + id);
            LOGGER.error("someone error visited get " + id);

            if (!id || !/(^[1-9]\d*$)/.test(id)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            let student = await studentService.get(id);
            commonResult.data = student;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @param next
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL getall': async (ctx, next) => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let page = params.page ? params.page : 0, size = params.size ? params.size : 20;
            if (page !== 0) {
                if (!/(^[1-9]\d*$)/.test(page) && page !== "0") {
                    commonResult.code = ApiStatusCode.PARAM_ERROR;
                    commonResult.message = "page格式错误";
                    ctx.response.body = commonResult;
                    return;
                } else {
                    page = parseInt(page);
                }
            }
            if (size !== 20) {
                if (!/(^[1-9]\d*$)/.test(size)) {
                    commonResult.code = ApiStatusCode.PARAM_ERROR;
                    commonResult.message = "size格式错误";
                    ctx.response.body = commonResult;
                    return;
                } else {
                    size = parseInt(size);
                }
            }
            let myPage = await studentService.getAll(page, size);
            commonResult.data = myPage;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @param next
         * @returns {Promise<void>}
         * @constructor
         */
        'POST add': async (ctx, next) => {
            let commonResult = new CommonResult();
            let params = ctx.request.body;
            let student = {
                note : params.note,
                number: params.number,
                name: params.name,
                age: parseInt(params.age)
            };
            let newStudent = await studentService.add(student);
            commonResult.data = newStudent;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @param next
         * @returns {Promise<void>}
         * @constructor
         */
        'POST update': async (ctx, next) => {
            let commonResult = new CommonResult();
            let params = ctx.request.body;
            let id = params.id;
            if (!id || !/(^[1-9]\d*$)/.test(id)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            let updatedParams = params.updatedParams;
            if (updatedParams) {
                updatedParams = JSON.parse(updatedParams);
                delete updatedParams["id"];
                delete updatedParams["create_time"];
                delete updatedParams["update_time"];
            }
            if (commonUtil.isEmptyObject(updatedParams)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "参数updatedParams错误：未提供或格式不正确";
                ctx.response.body = commonResult;
                return;
            }
            let student = await studentService.get(id);
            if (student === null) {
                commonResult.code = ApiStatusCode.NOT_FOUND;
                commonResult.message = "要更新的对象并不存在";
                ctx.response.body = commonResult;
                return;
            }
            let newStudent = await studentService.update(id, updatedParams);
            commonResult.data = newStudent;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @param next
         * @returns {Promise<void>}
         * @constructor
         */
        'POST delete': async (ctx, next) => {
            let commonResult = new CommonResult();
            let params = ctx.request.body;
            let id = params.id;
            if (!id || !/(^[1-9]\d*$)/.test(id)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            await studentService.del(id);
            ctx.response.body = commonResult;
        }
    }
};

module.exports = urlMapping;