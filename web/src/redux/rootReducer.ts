import {combineReducers} from 'redux';

// import shop from './shop/shop.reducers';
import {reducer as shop} from './shop';
import {reducer as product} from './shop';

const rootReducer = combineReducers({
  shop,
  product
});

export default rootReducer;