import { DATA_CONTENT_TYPES } from "../constants";
import BaseDataResolver from "./BaseData";
import { FormUrlencodedResolver } from "./FormUrlencoded";
import { JsonResolver } from "./Json";
import { MultiPartResolver } from "./MultiPart";
import { TextXmlResolver } from "./TextXml";

const dataResolverMap: Map<string, typeof BaseDataResolver> = new Map<
  string,
  typeof BaseDataResolver
>();
dataResolverMap.set(
  "application/x-www-form-urlencoded",
  FormUrlencodedResolver,
);
dataResolverMap.set("multipart/form-data", MultiPartResolver);
dataResolverMap.set("application/json", JsonResolver);
dataResolverMap.set("text/xml", TextXmlResolver);

export default class DataResolverFactory {
  public createDataResolver(contentType: string): BaseDataResolver {
    const contentTypeLowCased = contentType.toLowerCase();
    for (const dataContentType of DATA_CONTENT_TYPES) {
      if (contentTypeLowCased.includes(dataContentType)) {
        const ResolverCls = this._getDataResolverCls(dataContentType);
        return new ResolverCls();
      }
    }
    return new (this._getDataResolverCls("application/json"))();
  }

  private _getDataResolverCls(
    dataContentType: string,
  ): typeof BaseDataResolver {
    return dataResolverMap.get(dataContentType) ?? JsonResolver;
  }
}
