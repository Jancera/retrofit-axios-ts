import { NON_HTTP_REQUEST_PROPERTY_NAME } from "../constants";

export const nonHTTPRequestMethod = (target: any, methodName: string) => {
  const descriptor = {
    value: true,
    writable: false,
  };
  Object.defineProperty(
    target[methodName],
    NON_HTTP_REQUEST_PROPERTY_NAME,
    descriptor,
  );
};
