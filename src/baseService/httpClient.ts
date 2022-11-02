import axios, { AxiosInstance } from "axios";

import { ServiceBuilder } from "./serviceBuilder";
import {
  RequestConfig,
  RequestInterceptorFunction,
  Response,
  ResponseInterceptorFunction,
} from "./types";

axios.defaults.withCredentials = true;

export class HttpClient {
  private readonly axios: AxiosInstance = axios;
  private readonly standalone: boolean = false;

  constructor(builder: ServiceBuilder) {
    if (builder.standalone === true) {
      this.axios = axios.create();
      this.standalone = true;
    } else if (typeof builder.standalone === "function") {
      this.axios = builder.standalone;
    }

    builder.requestInterceptors.forEach((interceptor) => {
      this.axios.interceptors.request.use(
        interceptor.fulfilled,
        interceptor.rejected,
      );
    });

    builder.responseInterceptors.forEach((interceptor) => {
      this.axios.interceptors.response.use(
        interceptor.fulfilled,
        interceptor.rejected,
      );
    });
  }

  public isStandalone(): boolean {
    return this.standalone;
  }

  public async sendRequest(config: RequestConfig): Promise<Response> {
    return await this.axios(config);
  }

  public useRequestInterceptor(
    interceptor: RequestInterceptorFunction,
  ): number {
    return this.axios.interceptors.request.use(interceptor);
  }

  public useResponseInterceptor(
    interceptor: ResponseInterceptorFunction,
  ): number {
    return this.axios.interceptors.response.use(interceptor);
  }

  public ejectRequestInterceptor(id: number): void {
    this.axios.interceptors.request.eject(id);
  }

  public ejectResponseInterceptor(id: number): void {
    this.axios.interceptors.response.eject(id);
  }
}
