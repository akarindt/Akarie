export interface ApiResponse<T> {
    statusCode: number;
    responseText: string;
    data: T;
}

export interface ApiError {
    statusCode: number;
    title: string;
    message: string;
}
