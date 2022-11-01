import ensureMeta from "../helpers/ensureMeta";

/**
 * A easy way to send GraphQL query.
 * @param query
 * @param operationName
 * @sample @GraphQL(gqlQuery)
 * @constructor
 */
const GraphQL = (query: string, operationName?: string) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].gqlQuery = query;
    target.__meta__[methodName].gqlOperationName = operationName;
  };
};

export default GraphQL;
