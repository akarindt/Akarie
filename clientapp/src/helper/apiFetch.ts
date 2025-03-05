import { ApiError, ApiResponse } from '../interface/response';
import Constants from './constants';

export default class ApiFetch {
    private _api: string;
    private _options: RequestInit | undefined;
    private _method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    constructor(api: string) {
        this._api = api;
        this._method = 'GET';
    }

    set(options: RequestInit): this {
        this._options = options;
        return this;
    }

    get(): this {
        this._method = 'GET';
        return this;
    }

    post(): this {
        this._method = 'POST';
        return this;
    }

    put(): this {
        this._method = 'PUT';
        return this;
    }

    delete(): this {
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
                signal: AbortSignal.timeout(Constants.TIMEOUT_DURATION),
                body: body,
            });
            const data = await (response[type as keyof Response] as () => Promise<T>)();
            return data as ApiResponse<T>;
        } catch (error) {
            return error as ApiError;
        }
    }
}
