/**
 * 工具
 */
export const CommonUtil = {

    /**
     * 判断是否为空对象
     * @param obj 对象
     * @returns {boolean}
     */
    isEmptyObject(obj: any): boolean {
        if (obj === null || obj === undefined || obj === "" || obj === {} || obj === []) {
            return true;
        }
        for (let key in obj) {
            return false;
        }
        return true;
    },

    /**
     * 把一个日期变量按照给定格式输出
     * @param date 日期变量
     * @param format 日期格式
     * @returns {string}
     */
    dateFormat(date: Date, format: string): string {
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
};