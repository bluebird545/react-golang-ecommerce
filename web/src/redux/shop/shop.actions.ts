import * as type from './shop.types';

export const addToCart = (product: any) =>
  ({
    product,
    type: type.ADD_TO_CART
  } as const);
export const addToCartSuccess = (product: ShopAPI.Product) =>
  ({
    product,
    type: type.ADD_TO_CART_SUCCESS
  } as const);
export const addToCartFailure = (error: string) =>
  ({
    error,
    type: type.ADD_TO_CART_FAILURE
  } as const);

export const updateCart = (id: number, qty: number) => 
  ({
    id,
    qty,
    type: type.UPDATE_CART
  } as const);
export const updateCartSuccess = (id: number, qty: number) => 
  ({
    id,
    qty,
    type: type.UPDATE_CART_SUCCESS
  } as const);
export const updateCartFailure = (error: string) => 
  ({
    error,
    type: type.UPDATE_CART_FAILURE
  } as const);


export const handleQuantity = (id: number, qty: number) => 
  ({
    id,
    qty,
    type: type.HANDLE_QUANTITY
  } as const);
export const increaseQuantity = (id: number, qty: number) => 
  ({
    id,
    qty,
    type: type.INCREASE_QUANTITY
  } as const);
export const decreaseQuantity = (id: number, qty: number) => 
  ({
    id,
    qty,
    type: type.DECREASE_QUANTITY
  } as const);

export type Actions = ReturnType<
  | typeof addToCart
  | typeof addToCartSuccess
  | typeof addToCartFailure
  | typeof updateCart
  | typeof updateCartSuccess
  | typeof updateCartFailure
  | typeof handleQuantity
  | typeof increaseQuantity
  | typeof decreaseQuantity
>;