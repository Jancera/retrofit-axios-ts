import { Method } from "axios";

export type HttpMethod = Method;

export const DATA_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "application/json",
  "text/xml",
];

export enum HttpContentType {
  urlencoded = "application/x-www-form-urlencoded",
  multipart = "multipart/form-data",
  json = "application/json",
  xml = "text/xml",
}

export const NON_HTTP_REQUEST_PROPERTY_NAME = "__nonHTTPRequestMethod__";
