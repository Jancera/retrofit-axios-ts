import axios, { AxiosInstance } from "axios";
import { RequestInterceptor, ResponseInterceptor } from "../baseService.old";
import { ServiceBuilder } from "./serviceBuilder";
import { RequestConfig, Response } from "./types";

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
      if (interceptor instanceof RequestInterceptor) {
        this.axios.interceptors.request.use(
          interceptor.onFulfilled.bind(interceptor),
          interceptor.onRejected.bind(interceptor),
        );
      } else if (typeof interceptor === "object") {
        this.axios.interceptors.request.use(
          interceptor.fulfilled,
          interceptor.reject,
        );
      } else {
        this.axios.interceptors.request.use(interceptor);
      }
    });

    builder.responseInterceptors.forEach((interceptor) => {
      if (interceptor instanceof ResponseInterceptor) {
        this.axios.interceptors.response.use(
          interceptor.onFulfilled.bind(interceptor),
          interceptor.onRejected.bind(interceptor),
        );
      } else if (typeof interceptor === "object") {
        this.axios.interceptors.response.use(
          interceptor.fulfilled,
          interceptor.reject,
        );
      } else {
        this.axios.interceptors.response.use(interceptor);
      }
    });
  }

  public isStandalone(): boolean {
    return this.standalone;
  }

  public async sendRequest(config: RequestConfig): Promise<Response> {
    return this.axios(config);
  }

  /* public useRequestInterceptor(
    interceptor: RequestInterceptorFunction,
  ): number {
    return this.axios.interceptors.request.use(interceptor);
  } */

  /* public useResponseInterceptor(
    interceptor: ResponseInterceptorFunction,
  ): number {
    return this.axios.interceptors.response.use(interceptor);
  } */

  public ejectRequestInterceptor(id: number): void {
    this.axios.interceptors.request.eject(id);
  }

  public ejectResponseInterceptor(id: number): void {
    this.axios.interceptors.response.eject(id);
  }
}
