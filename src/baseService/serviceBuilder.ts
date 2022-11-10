import { AxiosInstance } from "axios";

import {
  LogCallback,
  RequestInterceptors,
  ResponseInterceptors,
} from "./types";

export class ServiceBuilder {
  private _endpoint: string = "";
  private _standalone: boolean | AxiosInstance = false;
  private readonly _requestInterceptors: RequestInterceptors[] = [];

  private readonly _responseInterceptors: ResponseInterceptors[] = [];

  private _timeout: number = 60000;
  private _logCallback: LogCallback | null = null;

  public build<T>(service: new (builder: ServiceBuilder) => T): T {
    return new service(this);
  }

  public setEndpoint(endpoint: string): ServiceBuilder {
    this._endpoint = endpoint;
    return this;
  }

  public setStandalone(standalone: boolean | AxiosInstance): ServiceBuilder {
    this._standalone = standalone;
    return this;
  }

  public setRequestInterceptors(
    interceptors: RequestInterceptors,
  ): ServiceBuilder {
    this._requestInterceptors.push(interceptors);
    return this;
  }

  public setResponseInterceptors(
    interceptors: ResponseInterceptors,
  ): ServiceBuilder {
    this._responseInterceptors.push(interceptors);
    return this;
  }

  public setTimeout(timeout: number): ServiceBuilder {
    this._timeout = timeout;
    return this;
  }

  public setLogCallback(logCallback: LogCallback): ServiceBuilder {
    this._logCallback = logCallback;
    return this;
  }

  get endpoint(): string {
    return this._endpoint;
  }

  get standalone(): boolean | AxiosInstance {
    return this._standalone;
  }

  get requestInterceptors(): RequestInterceptors[] {
    return this._requestInterceptors;
  }

  get responseInterceptors(): ResponseInterceptors[] {
    return this._responseInterceptors;
  }

  get timeout(): number {
    return this._timeout;
  }

  get logCallback(): LogCallback | null {
    return this._logCallback;
  }
}
