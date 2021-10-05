import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams, RouteProps} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import {listProducts} from '../../redux/shop/product/product.actions';

import Product from '@components/Product';

import {Products} from './fakeProducts';

import styles from './index.scss';
import { combineClasses } from '@util';

interface IProps {

}

type Props = RouteProps & IProps;

const ProductView = () => {
  const [view, setView] = useState('grid');
  const dispatch = useDispatch();
  const {collection}: {collection: string} = useParams();

  // get products
  useEffect(() => {
    console.log(collection);
    
    dispatch(listProducts(collection));
  }, [collection]);

  return (
    <div className={styles.products__wrapper}>
      <div className={styles.products__header}>
        <FontAwesomeIcon icon={faTh} className={view === 'grid' ? styles.active : ''} onClick={() => setView('grid')} />
        <FontAwesomeIcon icon={faAlignJustify} className={view === 'list' ? styles.active : ''} onClick={() => setView('list')} />
      </div>
      <section className={view === 'grid' ? combineClasses(styles.products, styles.grid, styles.group) : combineClasses(styles.products, styles.list, styles.group)}>
        
        <Product product={''} />
      </section>
    </div>
  );
};

export default ProductView;