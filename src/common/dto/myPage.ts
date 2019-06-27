/**
 * 自定义分页类
 */
export class MyPage<T> {
    pageNumber: number = 1;
    pageSize: number = 1;
    totalCount: number = 0;
    totalPages: number = 1;
    content: T[] = [];
}