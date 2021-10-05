import * as type from './shop.types';
import {Actions} from './shop.actions';

// interface Variants {
//   name: string,
//   price: number
//   quantity: number
// }

// interface Item {
//   price: number;
//   productID: number,
//   productSize: string,
//   quantity: number,
//   variants?: Variants[]
// }

interface State {
  cart: {
    id: number;
    items: ShopAPI.CartProduct[];
  },
  error: string
}

export const INITIAL_STATE: State = {
  cart: {
    id: null,
    items: [
      // {price: 18, productID: 1, productSize: "24oz", quantity: 1},
      // {price: 10, productID: 2, productSize: "16oz", quantity: 2},
      {
        id: '2',
        name: 'Face Oil',
        quantity: 0,
        price: 0,
        variants: [
          {
            id: '2_1',
            name: '16oz',
            price: 18,
            quantity: 1
          }
        ]
      },
      {
        id: '1',
        name: 'Oatmeal Body Butter',
        quantity: 2,
        price: 22,
        variants: [
          {
            id: '1_1',
            name: '13oz',
            price: 22,
            quantity: 2
          }
        ]
      },
    ],
  },
  error: ''
};

const reducer = (state: State = INITIAL_STATE, action: Actions) => {
  const { cart } = state;
  switch (action.type) {
    // case type.ADD_TO_CART:
    //   return {
    //     // ...state,
    //     // cart: [...cart, {productID: action.product}]
    //   };
    case type.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...cart,
          items: [...cart.items, action.product],
        }
      };
    case type.UPDATE_CART_SUCCESS:
      // let cart = cart;
      let item = cart.items.find(item => item.id == action.id);
      // console.log(item)
      // let newCart = cart.items.filter(item => item.productID != action.id);
      let newCart = cart.items;
      // console.log(newCart)

      item.quantity = action.qty;
      // newCart.push(item);
      // console.log(newCart)
      return {
        ...state,
        cart: {
          ...cart,
          items: newCart
        }
      }
    default:
      return state;
  }
};

export default reducer;