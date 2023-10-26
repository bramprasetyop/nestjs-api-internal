export interface resolverInfoArgs {
  key: string;
  typename: 'Query' | 'Mutation' | string;
}

export class GraphQLUtil {
  static getParentResolverInfo(info: any) {
    let node = info.path.prev;
    while (node.prev) {
      node = node.prev;
    }
    const parent: resolverInfoArgs = {
      key: node.key,
      typename: node.typename
    };
    return parent;
  }
}
