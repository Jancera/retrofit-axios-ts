import * as qs from "qs";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import FormData from "form-data";
import { DataResolverFactory } from "./dataResolver";
import { HttpMethod } from "./constants";
import { HttpMethodOptions } from "./decorators";
import { isNode } from "./util";

export type RequestInterceptorFunction = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type ResponseInterceptorFunction<T = any> = (
  value: AxiosResponse<T>,
) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

abstract class BaseInterceptor {
  public onRejected(error: any) {
    return;
  }
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
