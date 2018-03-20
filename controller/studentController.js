"use strict";

const studentService = require('../service/studentService');
const CommonResult = require('../dto/commonResult');

let urlMapping = {

    preFix: "/api/student/",

    mapping: {
        'GET get': async (ctx, next) => {
            let commonResult = new CommonResult();
            let id = ctx.query.id;
            let res = await studentService.get(id);
            commonResult.data = res;
            ctx.response.body = commonResult;
        },

        'GET getall': async (ctx, next) => {
            let commonResult = new CommonResult();
            let res = await studentService.getAll();
            commonResult.data = res;
            ctx.response.body = commonResult;
        },

        'GET add': async (ctx, next) => {

            let commonResult = new CommonResult();
            let student = {};
            student.note = ctx.query.note ? ctx.query.note: null;
            student.number = ctx.query.number;
            student.name = ctx.query.name;
            student.age = parseInt(ctx.query.age);
            let res = await studentService.add(student);
            commonResult.data = res;
            ctx.response.body = commonResult;
        },

        'GET update': async (ctx, next) => {

            let commonResult = new CommonResult();

            let id, updatedParams;
            id = parseInt(ctx.query.id);
            updatedParams = JSON.parse(ctx.query.updatedParams);

            if (!id || isNaN(id) || id <= 0) {
                commonResult.code = 432;
                commonResult.message = "参数id错误：未提供或格式不正确";
                res.send(commonResult);
            } else {
                let student = await studentService.update(id, updatedParams);
                commonResult.data = student;
                ctx.response.body = commonResult;
            }
        },

        'GET delete': async (ctx, next) => {
            let commonResult = new CommonResult();
            let id = ctx.query.id;
            await studentService.delete(id);
            ctx.response.body = commonResult;
        }
    }
};

module.exports = urlMapping;