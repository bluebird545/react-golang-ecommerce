import React from 'react';
import {RouteProps} from 'react-router-dom';
import {Products} from '../../containers/ProductView/fakeProducts';
import { combineClasses } from '@util';
import styles from './index.scss';

interface IProps {
  item: ShopAPI.CartProduct;
}

type Props = RouteProps & IProps;

class CartItems extends React.Component<Props> {
  render() {
    return(
      <>
        <li key={this.props.item.id} className={styles.item}>
          <div className={styles.imgPreview}>
            {/* <img src={list.image.url} alt={list.image.alt} /> */}
          </div>
          <div className={styles.details} style={{textAlign: 'center'}}>
            {/* <p>{list.name}</p> */}
            <p>{this.props.item.variants[0].name}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div className={styles.product__qty}>
              <div className={styles.qty__wrapper}>
                {/* <button className={styles.plusminus} onClick={() => updateQty(this.props.item.productID, this.props.item.quantity - 1)}><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" value={this.props.item.quantity} className={styles.qty_num} min="1" max="6" disabled />
                <button className={styles.plusminus} onClick={() => updateQty(this.props.item.productID, this.props.item.quantity + 1)}><FontAwesomeIcon icon={faPlus} /></button> */}
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            {/* {list.price} */}
            {this.props.item.price}
          </div>
        </li>
      </>
    );
  }
}

export default CartItems;