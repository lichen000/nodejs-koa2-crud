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
    }
};