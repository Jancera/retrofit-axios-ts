export interface Headers {
  [x: string]: string | number;
}

export interface Query {
  [x: string]: string | number | boolean;
}

export interface PartDescriptor<T> {
  value: T;
  filename?: string;
}

export interface HttpMethodOptions {
  ignoreBasePath?: boolean;
}

// indices:  ?foo[0]=bar&foo[1]=qux
// brackets: ?foo[]=bar&foo[]=qux
// repeat:   ?foo=bar&foo=qux
// comma:    ?foo=bar,qux
export type QueryArrayFormat = "indices" | "brackets" | "repeat" | "comma";

export interface QueryOptions {
  arrayFormat?: QueryArrayFormat; // default is brackets
}
