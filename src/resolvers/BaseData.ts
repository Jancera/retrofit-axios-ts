export default class BaseDataResolver {
  public resolve(headers: any, data: any): any {
    throw new Error("Can not call this method in BaseDataResolver.");
  }
}
