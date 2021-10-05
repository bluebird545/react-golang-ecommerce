import * as type from './product.types';
import {ProductActions} from './product.actions';


interface State {
}

export const INITIAL_STATE: State = {
};

const reducer = (state: State = INITIAL_STATE, action: ProductActions) => {
  switch (action.type) {
    case type.PRODUCT_LIST_REQUEST:
      return {
        ...state
      };
    // case type.PRODUCT_LIST_SUCCESS:
    //   return {
    //     ...state,
    //   };
    // case type.PRODUCT_LIST_FAIL:
    //   return {
    //     ...state,
    //   }
    default:
      return state;
  }
};

export default reducer;