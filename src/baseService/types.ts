import { AxiosRequestConfig, AxiosResponse } from "axios";

export type LogCallback = (config: RequestConfig, response: Response) => void;

export type RequestConfig = AxiosRequestConfig;

export interface Response<T = any> extends AxiosResponse<T> {}

export interface RequestInterceptors {
  fulfilled?: (
    config: AxiosRequestConfig,
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  rejected?: (error: any) => void;
}

export interface ResponseInterceptors {
  fulfilled?: <T>(
    response: AxiosResponse<T>,
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
  rejected?: (error: any) => void;
}

export type RequestInterceptorFunction = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type ResponseInterceptorFunction<T = any> = (
  value: AxiosResponse<T>,
) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
