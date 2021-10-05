import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import * as shopSelectors from '../../redux/shop/shop.selectors';
import * as shopActions from '../../redux/shop/shop.actions';
import {Products} from '../../containers/ProductView/fakeProducts';
import { combineClasses } from '@util';
import styles from './index.scss';

import CartItems from './CartItems';

const Cart = () => {
  const cart = useSelector(shopSelectors.cart);
  const { items } = cart;
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState('');
  // console.log("CART: " + cart)

  // calculate total number of items in cart
  let numOfItems: number = 0;
  // calculate cart total
  let cartTotal: number = 0;
  items.forEach(item => {
    cartTotal += (item.price * item.quantity);
    numOfItems += item.quantity;
  });
  // estimated shipping total
  const shippingTotal: number | string = cartTotal > 35 ? 'FREE' : 15;
  // set tax depending on state/location
  const taxTotal: number = cartTotal * 0.06;
  // complete order total
  const orderTotal = cartTotal + (typeof shippingTotal === 'string' ? 0 : shippingTotal) + taxTotal;

  const updateQty = (id: number, qty: number) => {
    dispatch(shopActions.updateCart(id, qty));
  };

  // const getProducts = (item: {price: number, productID: number, quantity: number, productSize: string}) => {
  //   return Products.find(product => product.id === item.productID)
  // };
  const getProducts = (item: ShopAPI.CartProduct) => {
    return Products.find(product => product.id === item.id);
  };

  const listItems = items.map(item => {
    // console.log("cart items:");
    // console.log(item)
    
    const list = getProducts(item);
    // console.log('====================================');
    // console.log(list);
    // console.log('====================================');
    item.variants.forEach(variant =>
      <li key={item.id} className={styles.item}>
        {variant.name}
        <div className={styles.imgPreview}>
          <img src={list.image.url} alt={list.image.alt} />
        </div>
      </li>
    );

    return(
      <li key={item.id} className={styles.item}>
        {/* {variant.name} */}
        {
          item.variants.forEach(variant => variant.name)
        }
        <div className={styles.imgPreview}>
          <img src={list.image.url} alt={list.image.alt} />
        </div>
      </li>
    );


    // const list = getProducts(item);
    // return (
    //   <li key={item.productID} className={styles.item}>
    //     <div className={styles.imgPreview}>
    //       <img src={list.image.url} alt={list.image.alt} />
    //     </div>
    //     <div className={styles.details} style={{textAlign: 'center'}}>
    //       <p>{list.name}</p>
    //       <p>{item.productSize}</p>
    //     </div>
    //     <div style={{textAlign: 'center'}}>
    //       <div className={styles.product__qty}>
    //         <div className={styles.qty__wrapper}>
    //           <button className={styles.plusminus} onClick={() => updateQty(item.productID, item.quantity - 1)}><FontAwesomeIcon icon={faMinus} /></button>
    //           <input type="number" value={item.quantity} className={styles.qty_num} min="1" max="6" disabled />
    //           <button className={styles.plusminus} onClick={() => updateQty(item.productID, item.quantity + 1)}><FontAwesomeIcon icon={faPlus} /></button>
    //         </div>
    //       </div>
    //     </div>
    //     <div style={{textAlign: 'center'}}>
    //       {/* {list.price} */}
    //       {item.price}
    //     </div>
    //   </li>
    // );
  });

  if (items.length < 1) {
    return (
      <div className={styles.emptyCart}>
        <p>No items in cart</p>
      </div>
    );
  } else {
    return (
      <div className={styles.cart}>
        <div className={styles.cart__items}>
          <ul className={styles.items__list}>
            {/* <li className={styles.item}>
              <div></div>
              <div></div>
              <div></div>
              <div>Total</div>
            </li> */}

            {/* {listItems} */}

            {cart && cart.items.length > 0 ? 
              (cart.items.map(item => (
                <CartItems key={item.id} item={item} />
              ))) :
              <></>
            }
          </ul>
        </div>
        <div className={styles.cart__checkout}>
          <div className={styles.checkout__btn}>
            <Link to="/checkout" className={styles.cart__btn}>Checkout</Link>
            <button type="submit" className={styles.cart__btn}>Checkout</button>
          </div>
            <p>Have a Discount Code?</p>
          <div className={styles.discount}>
            <div className={styles.placeholderInputFloat}>
              <input className={discountCode !== '' ? combineClasses(styles.discount__input, styles['has-content']) : styles.discount__input} type="text" id="" maxLength={16} onChange={(e) => setDiscountCode(e.target.value)} />
              <label>Discount Code</label>
              <button className={styles.discount__btn}>Apply</button>
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles['total-left']}>
              <p>Items ({numOfItems})</p>
              <p>Estimated Shipping</p>
              <p>Estimated Tax</p>
              <p className={styles.orderTotal}>Order Total</p>
            </div>
            <div className={styles['total-right']}>
              <p className={styles.monetary}>{cartTotal.toFixed(2)}</p>
              <p className={typeof shippingTotal === 'string' ? null : styles.monetary}>{typeof shippingTotal === 'string' ? shippingTotal : shippingTotal.toFixed(2)}</p>
              <p className={styles.monetary}>{taxTotal.toFixed(2)}</p>
              <p className={combineClasses(styles.monetary, styles.orderTotal)}>{orderTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;