/**
 * 统一返回对象
 */
export class CommonResult {
    code: number = 200;
    message: string = "OK";
    data: any = null;
    timestamp: number = new Date().getTime();
}