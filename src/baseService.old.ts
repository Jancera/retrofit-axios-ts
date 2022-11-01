import { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestInterceptorFunction = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type ResponseInterceptorFunction<T = any> = (
  value: AxiosResponse<T>,
) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

abstract class BaseInterceptor {
  public onRejected(error: any) {}
}

export abstract class RequestInterceptor extends BaseInterceptor {
  public abstract onFulfilled(
    value: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>;
}

export abstract class ResponseInterceptor<T = any> extends BaseInterceptor {
  public abstract onFulfilled(
    value: AxiosResponse<T>,
  ): AxiosResponse<T> | Promise<AxiosResponse<T>>;
}
