import {all, put, takeLatest, select} from 'redux-saga/effects';
import {GlobalState} from '../../store';
import * as actions from './product.actions';
import * as type from './product.types';
import {Products} from '../fakeProducts';

export function* getProductList(action: ReturnType<typeof actions.listProducts>) {
  console.log("welcome to 'getProductList()'");
  console.log(action.collection);
  
}
export function* getProductListGen() {
  yield takeLatest(type.PRODUCT_LIST_REQUEST, getProductList);
}

export default function* root() {
  yield all([getProductListGen()])
}