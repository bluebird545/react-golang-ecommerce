import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faAlignJustify } from '@fortawesome/free-solid-svg-icons'

import {Products} from '../fakeProducts';

import styles from './index.scss';

const ProductView = () => {
  const [view, setView] = useState('grid');
  const items = [];
  for (let index = 0; index < 4; index++) {
    
    let product = Products[index];
    console.log(product.id);
    items.push(
      <article key={product.id} className={styles.product}>
        <Link 
          to={{
            // pathname: `/collections/${product.collection}/${product.id}`,
            pathname: `/products/${product.id}`,
            search: `?collection=${product.collection}`,
            state: {
              title: product.name,
              product: product
            }
          }} >
          <img className={styles.product__img} src={product.image.url} alt={product.image.alt} />
          <p className={styles.product__name}>{product.name}</p>
          <p className={styles.product__price}>${product.price}</p>
        </Link>
      </article>
    )
  }
  return (
    // <div className="quick__view products__wrapper">
    <div className={styles.quick__view}>
      <section className={styles.products}>
        {items}
      </section>
    </div>
  );
};

export default ProductView;