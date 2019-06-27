/**
 * 员工service
 */

import { MyPage } from '../common/dto/myPage';
import { Employee } from '../entity/employee';
import { db } from '../config/db';

const employeeService = {

    /**
     * 获取记录数目
     * @returns {Promise<number>}
     */
    async count(): Promise<number> {
        const sql = "select count(*) as cnt from t_employee where record_status = 1";
        let [rows] = await db.query(sql);
        return rows[0].cnt;
    },

    /**
     * 获取单个员工对象
     * @param id 员工id
     * @returns {Promise<Employee | null>}
     */
    async get(id: number): Promise<Employee | null> {
        const sql = "select * from t_employee where record_status = 1 and id = ? limit 1";
        let [rows] = await db.query(sql, [id]);
        if (rows.length === 0) {
            return null;
        }
        let row = rows[0];
        let employee = new Employee();
        for (let key in employee) {
            if (row.hasOwnProperty(key)) {
                Object.defineProperty(employee, key, {
                    value: row[key],
                    writable: true
                });
            }
        }
        return employee;
    },

    /**
     * 分页获取员工对象
     * @param pageNumber 页码
     * @param pageSize 分页大小
     * @returns {Promise<MyPage<Employee> | null>}
     */
    async getAll(pageNumber: number, pageSize: number): Promise<MyPage<Employee> | null> {
        let myPage = new MyPage<Employee>();
        myPage.pageNumber = pageNumber;
        myPage.pageSize = pageSize;
        let count = await this.count();
        myPage.totalCount = count;
        if (count > 0) {
            let offset = (pageNumber - 1) * pageSize;
            const sql = "select * from t_employee where record_status = 1 order by id asc limit ? , ?";
            let [rows] = await db.query(sql, [offset, pageSize]);
            myPage.totalPages = Math.floor((myPage.totalCount - 1) / pageSize) + 1;
            for (let row of rows) {
                let employee = new Employee();
                for (let key in employee) {
                    if (row.hasOwnProperty(key)) {
                        Object.defineProperty(employee, key, {
                            value: row[key],
                            writable: true
                        });
                    }
                }
                myPage.content.push(employee);
            }
        }
        return myPage;
    },

    /**
     * 新增员工
     * @param employee 待新增的员工对象
     * @returns {Promise<Employee | null>}
     */
    async add(employee: Employee): Promise<Employee | null> {
        const sql = "insert into t_employee (employee_no, employee_name, age) values (?, ?, ?)";
        let [rows] = await db.query(sql, [employee.employee_no, employee.employee_name, employee.age]);
        if (rows.affectedRows === 0) {
            return null;
        }
        let id = rows.insertId;
        return this.get(id);
    },

    /**
     * 更新员工
     * @param id 要更新的员工id
     * @param updatedParams 更新字段参数
     * @returns {Promise<Employee | null>}
     */
    async update(id: number, updatedParams: any): Promise<Employee | null> {
        let dynamicSql = "";
        let params = [];
        for (let key in updatedParams) {
            if (updatedParams.hasOwnProperty(key)) {
                dynamicSql += (key + " = ?,");
                params.push(updatedParams[key]);
            }
        }
        dynamicSql = dynamicSql.substring(0, dynamicSql.length - 1);
        let sql = "update t_employee set " + dynamicSql + " where id = ? and record_status = 1";
        params.push(id);
        await db.query(sql, params);
        return this.get(id);
    },

    /**
     * 删除员工
     * @param id 要删除的员工id
     * @returns {Promise<void>}
     */
    async delete(id: number): Promise<void> {
        const sql = "update t_employee set record_status = 0 where id = ?";
        await db.query(sql, [id]);
        return;
    }
};

export { employeeService };