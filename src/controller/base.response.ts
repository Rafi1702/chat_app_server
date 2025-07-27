type Status = 'success' | 'error'

interface BaseResponse<T> {
    status: Status
    message: string,
    data?: T,
}
interface Paginate {
    offset: number,
    limit: number,
}

interface PaginatedResponse<T> extends BaseResponse<T[]> {
    pagination: Paginate; // Pagination metadata
}

export function createBaseResponse<T>(
    status: Status,
    message: string,
    data: T
): BaseResponse<T> {
    return { status, message, data };
}

export function createPaginatedResponse<T>(
    status: Status,
    message: string,
    data: T[],
    pagination: Paginate
): PaginatedResponse<T> {
    return {status, message, data, pagination}
}