import {all, put, takeLatest, select} from 'redux-saga/effects';
import {useSelector} from 'react-redux';

import {GlobalState} from '../store';

import * as actions from './shop.actions';
import * as type from './shop.types';
import {cart} from './shop.selectors';

import {Products} from '../../containers/ProductView/fakeProducts';


export function* addToCart(action: ReturnType<typeof actions.addToCart >) {
  const state: GlobalState = yield select();
  const cart = state.shop.cart;
  // console.log("CART", state.shop.cart);
  
  // const response = Products.find(product => action.product.id === product.id);
  const { product } = action;

  // check if item exists in cart
  let itemExists = false;
  cart.items.forEach((item) => {
    if (item.id == product.productID) {
      itemExists = true;
    }
  })

  // console.log(itemExists);
  

  yield put(actions.addToCartSuccess(product));
  // if (response) {
  //   yield put(actions.addToCartSuccess({productID: response.id, quantity: action.quantity}))
  // } else {
  //   yield put(actions.addToCartFailure("Something went wrong"))
  // }

  return;
}
export function* watchForAddProduct() {
  yield takeLatest(type.ADD_TO_CART, addToCart);
}

export function* updateCart(action: ReturnType<typeof actions.updateCart>) {
  const state: GlobalState = yield select();

  // const response = state.shop.cart.items.some(product => product.productID === action.id ? product.quantity =+ action.qty : product.quantity);
  const response = state.shop.cart.items.some(product => product.productID === action.id);

  // const updatedCart = {
  //   items: [...state.shop.cart.items]
  // }


  // // increase of decrease quantity of product in cart
  if (response) {
    // increase quantity
    yield put(actions.updateCartSuccess(action.id, action.qty))
  } else {
    // decrease quantity
    yield put(actions.updateCartFailure("Spmething went wrong"))
  }

  return;
}
export function* watchForCartUpdate() {
  yield takeLatest(type.UPDATE_CART, updateCart);
}

export default function* root() {
  yield all([watchForAddProduct(), watchForCartUpdate()]);
}