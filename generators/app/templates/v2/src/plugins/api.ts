import Request, { HttpRequestConfig } from "luch-request";
import Store from "/@plugins/vuex";

export const [AppRequest] = [
    new Request({
        baseURL: process.env.VUE_APP_API_BASEURL_APP,
        timeout: 300000
    })
];

const utilities = {
    generateApiName: (config: Record<string, any>) => {
        return config.custom && config.custom.name ? `${config.custom.name} ` : '';
    }
};

AppRequest.interceptors.request.use(
    (config) => {
        const state = Store.state as Plugin.Vuex.StoreRootState;
        const getters = Store.getters as any;
        if (config.header) {
        }
        if (config.custom && config.custom.showLoading) {
            uni.showLoading({
                title: `${utilities.generateApiName(config)}...`
            });
        }
        return config;
    },
    (config) => {
        return config;
    }
);

AppRequest.interceptors.response.use(
    (response) => {
        // if (response.config.custom && response.config.custom.showLoading) {
        //     uni.hideLoading();
        // }
        // if (response.statusCode === 200) {
        //     if (response.data.error === 1) {
        //         const backendErrorTip = response.data.data || '请求异常';
        //         uni.showToast({
        //             title: utilities.generateApiName(response.config) + backendErrorTip,
        //             icon: 'none'
        //         });
        //         return Promise.reject(response);
        //     }
        //     return response.data.data;
        // }
        return response;
    },
    (response) => {
        // uni.showToast({
        //     title: utilities.generateApiName(response.config) + '请求异常',
        //     icon: 'none'
        // });
        // if (response.statusCode !== 200) {
        //     return Promise.reject(response);
        // }
        return response;
    }
);

const instances = {
    app: AppRequest
};

// @ts-ignore
class ApiRequest implements Plugin.Api.RequestWrapper {
    _instance: Plugin.Api.RequestWrapper['_instance'] = null;
    _method: Plugin.Api.RequestWrapper['_method'] = null;
    _url: Plugin.Api.RequestWrapper['_url'] = null;
    _params: Plugin.Api.RequestWrapper['_params'] = undefined;
    _custom: Plugin.Api.RequestWrapper['_custom'] = {};
    _config: Plugin.Api.RequestWrapper['_config'] = undefined;
    _file: Plugin.Api.RequestWrapper['_file'] = undefined;
    _filePath: Plugin.Api.RequestWrapper['_filePath'] = undefined;
    _formData: Plugin.Api.RequestWrapper['_formData'] = undefined;

    constructor(service: string, name?: string) {
        // @ts-ignore
      this._instance = instances[service];
        if (name) {
            this._custom['name'] = name;
        }
        return this;
    }

    service(service: Plugin.Api.Service): this {
        // @ts-ignore
      this._instance = instances[service];
        return this;
    }

    get(url: Plugin.Api.RequestWrapper['_url']): this {
        this._method = 'GET';
        this._url = url;
        return this;
    }

    download(url: Plugin.Api.RequestWrapper['_url']): this {
        this._method = 'DOWNLOAD';
        this._url = url;
        return this;
    }

    put(url: Plugin.Api.RequestWrapper['_url']): this {
        this._method = 'PUT';
        this._url = url;
        return this;
    }

    post(url: Plugin.Api.RequestWrapper['_url']): this {
        this._method = 'POST';
        this._url = url;
        return this;
    }

    upload(url: Plugin.Api.RequestWrapper['_url']): this {
        this._method = 'UPLOAD';
        this._url = url;
        return this;
    }

    file(file: Plugin.Api.RequestWrapper['_file']): this {
        let formData;
        if (file instanceof File) {
            formData = new FormData();
            formData.append('file', file);
        } else if (file instanceof FormData) {
            formData = file;
        }
        this._file = formData;
        return this;
    }

    formData(formDataObject: Utility.AnyObject) {
        this._formData = formDataObject;
        return this;
    }

    filePath(filePath: Plugin.Api.RequestWrapper['_filePath']): this {
        if (this._method !== 'UPLOAD') {
            console.warn('[Plugin / API] Your should use FilePath() with upload() methods in one request instance.');
        }
        this._filePath = filePath;
        return this;
    }

    name(name: string): this {
        this._custom['name'] = name;
        return this;
    }

    params(params: Plugin.Api.RequestWrapper['_params']): this {
        if (params) {
            this._params = params;
        }
        return this;
    }

    config(config: Plugin.Api.RequestWrapper['_config']): this {
        if (config) {
            this._config = config;
        }
        return this;
    }

    showLoading(status = true): this {
        this._custom['showLoading'] = status;
        return this;
    }

    request(): Plugin.Api.BaseResponse {
        if (!this._method || !this._url) {
            return;
        }
        const requestParams: HttpRequestConfig<UniApp.RequestTask> = {
            method: this._method,
            url: this._url
        };
        if (this._custom) {
            requestParams.custom = this._custom;
        }
        if (this._params) {
            if (this._method === 'GET') {
                requestParams.params = this._params;
            }
            if (this._method === 'POST') {
                requestParams.data = this._params;
            }
        }
        if (this._method === 'UPLOAD') {
            requestParams.method = 'POST';
            requestParams.header = { 'Content-Type': 'multipart/form-data' };
            requestParams.name = 'file';
            requestParams.filePath = this._filePath;
            requestParams.formData = this._formData;
            return this._instance.upload(this._url, requestParams);
        }
        if (this._instance) {
            if (this._method === 'DOWNLOAD') {
                return this._instance.download(this._url, requestParams);
            }
            return this._instance.request(requestParams);
        }
        return null;
    }
}

export default ApiRequest;
