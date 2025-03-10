import { ApiError, ApiResponse } from '../interface/response';
import Constants from './constants';

export default class ApiFetch {
    private _api: string;
    private _options: Omit<RequestInit, 'body'> | undefined;
    private _method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    constructor() {
        this._api = '';
        this._method = 'GET';
    }

    set(options: Omit<RequestInit, 'body'> | undefined = undefined): this {
        this._options = options;
        return this;
    }

    get(endPoint: string): this {
        this._api = endPoint;
        this._method = 'GET';
        return this;
    }

    post(endPoint: string): this {
        this._api = endPoint;
        this._method = 'POST';
        return this;
    }

    put(endPoint: string): this {
        this._api = endPoint;
        this._method = 'PUT';
        return this;
    }

    delete(endPoint: string): this {
        this._api = endPoint;
        this._method = 'DELETE';
        return this;
    }

    async fetch<T>(
        type: 'arrayBuffer' | 'json' | 'blob' | 'formData' | 'text',
        body: BodyInit | null | undefined = undefined
    ): Promise<ApiResponse<T> | ApiError> {
        try {
            const response = await fetch(`${Constants.BASE_API}/${this._api}`, {
                ...this._options,
                method: this._method,
                body: body,
            });
            const data = await (response[type as keyof Response] as () => Promise<T>)();
            return data as ApiResponse<T>;
        } catch (error) {
            return error as ApiError;
        }
    }
}
