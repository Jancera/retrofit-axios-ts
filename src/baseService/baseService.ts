/* eslint-disable @typescript-eslint/no-this-alias */
import * as qs from "qs";
import { HttpMethod, NON_HTTP_REQUEST_PROPERTY_NAME } from "../constants";
import { HttpMethodOptions } from "../decorators";
import FormData from "form-data";
import { HttpClient } from "./httpClient";
import { nonHTTPRequestMethod } from "./helpers/nonHTTPRequestMethod";
import { ServiceBuilder } from "./serviceBuilder";
import {
  LogCallback,
  RequestConfig,
  RequestInterceptorFunction,
  ResponseInterceptorFunction,
} from "./types";
import { isNode } from "../utils";
import DataResolverFactory from "../resolvers/Data";

export class BaseService {
  public __meta__: any;
  private _endpoint: string;
  private readonly _httpClient: HttpClient;
  private _methodMap: Map<string, Function>;
  private _timeout: number;
  private _logCallback: LogCallback | null;

  constructor(serviceBuilder: ServiceBuilder) {
    this._endpoint = serviceBuilder.endpoint;
    this._httpClient = new HttpClient(serviceBuilder);
    this._methodMap = new Map<string, Function>();
    this._timeout = serviceBuilder.timeout;
    this._logCallback = serviceBuilder.logCallback;

    const methodNames = this._getInstanceMethodNames();

    methodNames.forEach((methodName) => {
      this._methodMap[methodName] = this[methodName];
    });

    const self = this;
    for (const methodName of methodNames) {
      const descriptor = {
        enumerable: true,
        configurable: true,
        get(): Function {
          const method = self._methodMap[methodName];
          const methodOriginalDescriptor = Object.getOwnPropertyDescriptor(
            method,
            NON_HTTP_REQUEST_PROPERTY_NAME,
          );
          if (
            methodOriginalDescriptor &&
            methodOriginalDescriptor.value === true
          ) {
            return method;
          }
          if (methodName === "_logCallback") {
            return method;
          }
          return async (...args: any[]) => {
            return await self._wrap(methodName, args);
          };
        },
        set: (newValue: any) => {
          self._methodMap[methodName] = newValue;
        },
      };
      Object.defineProperty(this, methodName, descriptor);
    }
  }

  @nonHTTPRequestMethod
  public isClientStandalone(): boolean {
    return this._httpClient.isStandalone();
  }

  @nonHTTPRequestMethod
  public useRequestInterceptor(
    interceptor: RequestInterceptorFunction,
  ): number {
    return this._httpClient.useRequestInterceptor(interceptor);
  }

  @nonHTTPRequestMethod
  public useResponseInterceptor(
    interceptor: ResponseInterceptorFunction,
  ): number {
    return this._httpClient.useResponseInterceptor(interceptor);
  }

  @nonHTTPRequestMethod
  public ejectRequestInterceptor(id: number): void {
    this._httpClient.ejectRequestInterceptor(id);
  }

  @nonHTTPRequestMethod
  public ejectResponseInterceptor(id: number): void {
    this._httpClient.ejectResponseInterceptor(id);
  }

  @nonHTTPRequestMethod
  public setEndpoint(endpoint: string): void {
    this._endpoint = endpoint;
  }

  @nonHTTPRequestMethod
  public setLogCallback(logCallback: LogCallback | null): void {
    this._logCallback = logCallback;
  }

  @nonHTTPRequestMethod
  public setTimeout(timeout: number): void {
    this._timeout = timeout;
  }

  @nonHTTPRequestMethod
  private _getInstanceMethodNames(): string[] {
    let properties: string[] = [];
    let obj = this;

    do {
      properties = properties.concat(Object.getOwnPropertyNames(obj));
      obj = Object.getPrototypeOf(obj);
    } while (obj);

    return properties.sort().filter((e, i, arr) => {
      return e !== arr[i + 1] && this[e] && typeof this[e] === "function";
    });
  }

  @nonHTTPRequestMethod
  private async _wrap(methodName: string, args: any[]): Promise<Response> {
    const { url, method, headers, query, data, signal } =
      this._resolveParameters(methodName, args);

    const config = this._makeConfig(
      methodName,
      url,
      method,
      headers,
      query,
      data,
      signal,
    );

    let error;
    let response;

    try {
      response = await this._httpClient.sendRequest(config);
    } catch (err: any) {
      error = err;
      response = err.response;
    }

    if (this._logCallback) {
      this._logCallback(config, response);
    }

    if (error) {
      throw error;
    }

    return response;
  }

  @nonHTTPRequestMethod
  private _resolveParameters(methodName: string, args: any[]): any {
    const url = this._resolveUrl(methodName, args);
    const method = this._resolveHttpMethod(methodName);
    let headers = this._resolveHeaders(methodName, args);
    const query = this._resolveQuery(methodName, args);
    const data = this._resolveData(methodName, headers, args);
    const signal = this._resolveSignal(methodName, args);

    if (
      headers["content-type"] &&
      headers["content-type"].indexOf("multipart/form-data") !== -1 &&
      isNode
    ) {
      headers = {
        ...headers,
        ...(data as FormData).getHeaders(),
      };
    }
    return { url, method, headers, query, data, signal };
  }

  @nonHTTPRequestMethod
  private _makeConfig(
    methodName: string,
    url: string,
    method: HttpMethod,
    headers: any,
    query: any,
    data: any,
    signal: any,
  ): RequestConfig {
    let config: RequestConfig = {
      url,
      method,
      headers,
      params: query,
      data,
      signal,
    };

    // response type
    if (this.__meta__[methodName].responseType) {
      config.responseType = this.__meta__[methodName].responseType;
    }
    // request transformer
    if (this.__meta__[methodName].requestTransformer) {
      config.transformRequest = this.__meta__[methodName].requestTransformer;
    }
    // response transformer
    if (this.__meta__[methodName].responseTransformer) {
      config.transformResponse = this.__meta__[methodName].responseTransformer;
    }
    // timeout
    config.timeout = this.__meta__[methodName].timeout || this._timeout;
    // deprecated
    if (this.__meta__[methodName].deprecated) {
      let hint = `[warning] Deprecated method: "${methodName}". `;
      if (this.__meta__[methodName].deprecatedHint) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        hint += this.__meta__[methodName].deprecatedHint;
      }
      // tslint:disable-next-line:no-console
      console.warn(hint);
    }
    // query array format
    if (this.__meta__[methodName].queryArrayFormat) {
      if (config.paramsSerializer) {
        config.paramsSerializer.serialize = (params: any): string => {
          return qs.stringify(params, {
            arrayFormat: this.__meta__[methodName].queryArrayFormat,
          });
        };
      }
    }
    // mix in config set by @Config
    config = {
      ...config,
      ...this.__meta__[methodName].config,
    };
    return config;
  }

  @nonHTTPRequestMethod
  private _resolveUrl(methodName: string, args: any[]): string {
    const meta = this.__meta__;
    const endpoint = this._endpoint;
    const basePath = meta.basePath;
    const path = meta[methodName].path;
    const pathParams = meta[methodName].pathParams;
    const options = meta[methodName].options || {};
    let url = this.makeURL(endpoint, basePath, path, options);
    for (const pos in pathParams) {
      if (pathParams[pos]) {
        url = url.replace(new RegExp(`\{${pathParams[pos]}}`), args[pos]);
      }
    }
    return url;
  }

  @nonHTTPRequestMethod
  private makeURL(
    endpoint: string,
    basePath: string,
    path: string,
    options: HttpMethodOptions,
  ): string {
    const isAbsoluteURL = /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(path);
    if (isAbsoluteURL) {
      return path;
    }
    if (options.ignoreBasePath) {
      return [endpoint, path].join("");
    }
    return [endpoint, basePath, path].join("");
  }

  @nonHTTPRequestMethod
  private _resolveHttpMethod(methodName: string): HttpMethod {
    const meta = this.__meta__;
    return meta[methodName].method;
  }

  @nonHTTPRequestMethod
  private _resolveHeaders(methodName: string, args: any[]): any {
    const meta = this.__meta__;
    const headers = meta[methodName].headers || {};
    const headerParams = meta[methodName].headerParams;
    for (const pos in headerParams) {
      if (headerParams[pos]) {
        headers[headerParams[pos]] = args[pos];
      }
    }
    const headerMapIndex = meta[methodName].headerMapIndex;
    if (headerMapIndex >= 0) {
      for (const key in args[headerMapIndex]) {
        if (args[headerMapIndex][key]) {
          headers[key] = args[headerMapIndex][key];
        }
      }
    }
    return headers;
  }

  @nonHTTPRequestMethod
  private _resolveQuery(methodName: string, args: any[]): any {
    const meta = this.__meta__;
    const query = meta[methodName].query || {};
    const queryParams = meta[methodName].queryParams;
    for (const pos in queryParams) {
      if (queryParams[pos]) {
        query[queryParams[pos]] = args[pos];
      }
    }
    const queryMapIndex = meta[methodName].queryMapIndex;
    if (queryMapIndex >= 0) {
      for (const key in args[queryMapIndex]) {
        if (args[queryMapIndex][key]) {
          query[key] = args[queryMapIndex][key];
        }
      }
    }
    return query;
  }

  @nonHTTPRequestMethod
  private _resolveSignal(methodName: string, args: any[]): any {
    const meta = this.__meta__;
    let signal;

    const abortSignal = meta[methodName].signal;

    // @AbortSignal
    if (abortSignal >= 0) {
      signal = args[abortSignal];
    }

    return signal;
  }

  @nonHTTPRequestMethod
  private _resolveData(methodName: string, headers: any, args: any[]): any {
    const meta = this.__meta__;
    const bodyIndex = meta[methodName].bodyIndex;
    const fields = meta[methodName].fields || {};
    const parts = meta[methodName].parts || {};
    const fieldMapIndex = meta[methodName].fieldMapIndex;
    const gqlQuery = meta[methodName].gqlQuery;
    const gqlOperationName = meta[methodName].gqlOperationName;
    const gqlVariablesIndex = meta[methodName].gqlVariablesIndex;

    let data: any = {};

    // @Body
    if (bodyIndex >= 0) {
      if (Array.isArray(args[bodyIndex])) {
        data = args[bodyIndex];
      } else {
        data = { ...data, ...args[bodyIndex] };
      }
    }

    // @Field
    if (Object.keys(fields).length > 0) {
      const reqData = {};
      for (const pos in fields) {
        if (fields[pos]) {
          reqData[fields[pos]] = args[pos];
        }
      }
      data = { ...data, ...reqData };
    }

    // @FieldMap
    if (fieldMapIndex >= 0) {
      const reqData = {};
      for (const key in args[fieldMapIndex]) {
        if (args[fieldMapIndex][key]) {
          reqData[key] = args[fieldMapIndex][key];
        }
      }
      data = { ...data, ...reqData };
    }

    // @MultiPart
    if (Object.keys(parts).length > 0) {
      const reqData = {};
      for (const pos in parts) {
        if (parts[pos]) {
          reqData[parts[pos]] = args[pos];
        }
      }
      data = { ...data, ...reqData };
    }

    // @GraphQL
    if (gqlQuery) {
      data.query = gqlQuery;
      if (gqlOperationName) {
        data.operationName = gqlOperationName;
      }
      // @GraphQLVariables
      if (gqlVariablesIndex >= 0) {
        data.variables = args[gqlVariablesIndex];
      }
    }

    const contentType = headers["content-type"] || "application/json";
    const dataResolverFactory = new DataResolverFactory();
    const dataResolver = dataResolverFactory.createDataResolver(contentType);
    return dataResolver.resolve(headers, data);
  }
}
