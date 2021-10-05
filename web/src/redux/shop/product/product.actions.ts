import * as type from './product.types';

export const listProducts = (collection: string) =>
  ({
    collection: collection != 'all' ? collection : '',
    type: type.PRODUCT_LIST_REQUEST
  } as const);

export type ProductActions = ReturnType<
  | typeof listProducts
>;