declare namespace Plugin {
    declare namespace Api {
        import HttpRequest, { HttpRequestConfig, HttpResponse } from 'luch-request';

        export type BaseResponse = Promise<HttpResponse<T>>['data'];
        export interface RequestWrapper {
            _instance: HttpRequest | null;
            _method: HttpRequestConfig['method'] | null;
            _url: string | null;
            _params: Utility.AnyObject | undefined;
            _custom: Utility.AnyObject | undefined;
            _config: HttpRequestConfig | undefined;
            _file: FormData | File | undefined;
            _filePath: string | undefined;
            _formData: Utility.AnyObject | undefined;

            new (service: Ewsedu.ApiService, name?: string): this;

            service(service: Ewsedu.ApiService): this;

            get(url: string): this;

            put(url: string): this;

            download(url: string): this;

            post(url: string): this;

            upload(url: string): this;

            name(name: string): this;

            file(file: FormData | File | undefined): this;

            formData(formDataObject: Ewsedu.OSS.AnyObject): this;

            filePath(file: string | undefined): this;

            showLoading(status: boolean = true): this;

            params(params: Utility.AnyObject): this;

            config(config: HttpRequestConfig): this;

            request(): Plugin.Api.BaseResponse;
        }

        export type Service = {};
    }
    declare namespace Logger {
        export type PrintToConsole = (target: any, name?: string) => void;
    }
    declare namespace Toast {
        export type Show = (content: string) => void;
    }
    declare namespace Utility {}
    declare namespace Vuex {
        export interface StoreRootState {}
    }
    declare namespace Mixin {
        export type UseMethodItem = {
            name: string;
            args?: any[];
            fallback?: {
                name: string;
                args?: any[];
            };
        };
        export type ObjectWithMethod<T> = T & { method?: UseMethodItem | UseMethodItem[] };
    }
    declare namespace Time {
        export type ValueType = 'timestamp' | 'timeString';

        export interface Wrapper {
            new (timeValue: string | number): this;

            append(appendExtraFormat: 'week' | 'from' | 'recent' | ('week' | 'from' | 'recent')[]): this;

            format(format: 'date' | 'datetime' | 'time' | 'full' | string): string | null;
        }
    }
}

declare module 'uview-ui';
