import {all} from 'redux-saga/effects';

import shop from './shop';
import product from './shop/product';
function* rootSaga() {
  yield all([
    shop.sagas.default(),
    product.sagas.default(),
  ]);
}

export default rootSaga;