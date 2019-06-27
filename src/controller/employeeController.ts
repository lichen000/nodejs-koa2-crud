/**
 * 员工controller
 */

import { employeeService } from '../service/employeeService';
import { CommonResult } from '../common/dto/commonResult';
import { ApiStatusCode } from '../common/code/apiStatusCode';
import { LOGGER } from '../common/utils/logUtil';
import { Employee } from '../entity/employee';
import { CommonUtil } from '../common/utils/commonUtil';

const urlMapping = {

    preFix: "/api/employee/",

    mapping: {

        /**
         *
         * @param ctx
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL get': async (ctx: any): Promise<void> => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let id = params.id;
            if (!id || !/(^[1-9]\d*$)/.test(id)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            let employee = await employeeService.get(id);
            commonResult.data = employee;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL getall': async (ctx: any): Promise<void> => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let pageNumber = params.pageNumber ? params.pageNumber : 1;
            let pageSize = params.pageSize ? params.pageSize : 10;
            if (pageNumber !== 1) {
                if (!/(^[1-9]\d*$)/.test(pageNumber)) {
                    commonResult.code = ApiStatusCode.PARAM_ERROR;
                    commonResult.message = "pageNumber格式错误";
                    ctx.response.body = commonResult;
                    return;
                } else {
                    pageNumber = parseInt(pageNumber);
                }
            }
            if (pageSize !== 10) {
                if (!/(^[1-9]\d*$)/.test(pageSize)) {
                    commonResult.code = ApiStatusCode.PARAM_ERROR;
                    commonResult.message = "pageSize格式错误";
                    ctx.response.body = commonResult;
                    return;
                } else {
                    pageSize = parseInt(pageSize);
                }
            }
            let myPage = await employeeService.getAll(pageNumber, pageSize);
            commonResult.data = myPage;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL add': async (ctx: any): Promise<void> => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let employee_no = params.employee_no;
            let employee_name = params.employee_name;
            let age = params.age ? params.age : 0;
            LOGGER.info("/api/employee/getall visited, employee_no: %s, employee_name: %s, age: %s", employee_no, employee_name, age);
            if (!employee_no && !employee_name) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "employee_no或employee_name格式错误";
                ctx.response.body = commonResult;
                return;
            }
            if (age !== 0) {
                if (!/(^[1-9]\d*$)/.test(age)) {
                    commonResult.code = ApiStatusCode.PARAM_ERROR;
                    commonResult.message = "age格式错误";
                    ctx.response.body = commonResult;
                    return;
                } else {
                    age = parseInt(age);
                }
            }
            let employee = new Employee();
            employee.employee_no = employee_no;
            employee.employee_name = employee_no;
            employee.age = age;
            let newEmployee = await employeeService.add(employee);
            commonResult.data = newEmployee;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL update': async (ctx: any): Promise<void> => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let id = params.id;
            let updatedParams = params.updatedParams;
            if (!id || !/(^[1-9]\d*$)/.test(id) || CommonUtil.isEmptyObject(updatedParams)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id或updatedParams格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            let employee = await employeeService.get(id);
            if (!employee) {
                commonResult.code = ApiStatusCode.NOT_FOUND;
                commonResult.message = "要更新的对象并不存在";
                ctx.response.body = commonResult;
                return;
            }
            updatedParams = JSON.parse(updatedParams);
            // 这里有两种做法，一种是当可更新字段很少，较固定的场景（本场景即是)，对应service层sql是固定的
            // 另一种是可更新字段较多的，采用排除不可更新字段，动态sql拼接的方式，
            // 本问题适合第一种做法，但这里故意用第二种方法

            delete updatedParams["id"];
            delete updatedParams["create_time"];
            delete updatedParams["update_time"];
            delete updatedParams["record_status"]; // 这些字段不允许更新

            if (CommonUtil.isEmptyObject(updatedParams)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "没有可更新的字段项";
                ctx.response.body = commonResult;
                return;
            }

            let newEmployee = await employeeService.update(id, updatedParams);
            commonResult.data = newEmployee;
            ctx.response.body = commonResult;
        },

        /**
         *
         * @param ctx
         * @returns {Promise<void>}
         * @constructor
         */
        'ALL delete': async (ctx: any): Promise<void> => {
            let commonResult = new CommonResult();
            let params = ctx.req.method === "GET" ? ctx.query : ctx.request.body;
            let id = params.id;
            if (!id || !/(^[1-9]\d*$)/.test(id)) {
                commonResult.code = ApiStatusCode.PARAM_ERROR;
                commonResult.message = "id格式错误";
                ctx.response.body = commonResult;
                return;
            }
            id = parseInt(id);
            await employeeService.delete(id);
            ctx.response.body = commonResult;
        }
    }
};

module.exports = urlMapping;