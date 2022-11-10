import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Adds variables to GraphQL query
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @GraphQLVariables variables: any
 * @constructor
 */
export const GraphQLVariables = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].gqlVariablesIndex = paramIndex;
};
