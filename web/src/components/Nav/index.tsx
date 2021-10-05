import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './index.scss';
import * as shopSelectors from '../../redux/shop/shop.selectors';

const Nav = () => {
  const cart = useSelector(shopSelectors.cart);
  let cartQty = 0;
  cart.items.map(item => cartQty += item.quantity);
  
  return (
    <header>
      {/* top banner */}
      <div className={styles['rotating-banner']}>
        <span className={styles['rotating-banner__text']}>
          <span>Free shipping over $35</span>
        </span>
      </div>
      <nav className={styles.navbar}>
        {/* left */}
        <div className={styles['navbar__far-left']}>
          <ul className={styles.links}>
            <li>
              <Link to={{
                pathname: '/collections/face-care',
                state: {
                  title: 'Face Care'
                }
              }}>
                Face
              </Link>
            </li>
            <li>
              <Link to={{
                pathname: '/collections/body-care',
                state: {
                  title: 'Body Care'
                }
              }}>
                Body
              </Link>
            </li>
          </ul>
        </div>

        {/* brand */}
        <div className={styles.navbar__middle}>
          <Link to="/" className={styles.brand}>skin and body</Link>
        </div>

        {/* right */}
        <div className={styles['navbar__far-right']}>
          <ul className={styles.links}>
            <li>
              <Link to='/'>
                Log In
              </Link>
            </li>
            <li className={styles.cartWrapper}>
              <Link to='/shop/cart'>
                <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />  
                {cartQty ? <span className={styles.cartQty}>{cartQty}</span> : null}                
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
