import { AxiosRequestConfig, AxiosResponse } from "axios";

export type LogCallback = (config: RequestConfig, response: Response) => void;

export type RequestConfig = AxiosRequestConfig;

export interface Response<T = any> extends AxiosResponse<T> {}

export interface RequestInterceptors {
  fulfilled(
    value: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>;
  reject(erro: any): void;
}

export interface ResponseInterceptors {
  fulfilled<T>(
    value: AxiosResponse<T>,
  ): AxiosResponse<T> | Promise<AxiosResponse<T>>;
  reject(erro: any): void;
}
