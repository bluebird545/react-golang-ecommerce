import React from 'react';
import {useParams, RouteProps} from 'react-router-dom';

interface IProps {
  product: string | ShopAPI.Product;
}
type Props = RouteProps & IProps;

const Product = (props: Props) => {

  return(
    <>TBD</>
    // {
    //   Products.map(product =>
    //     (
    //       <article key={product.id} className={styles.product}>
    //         <Link 
    //           to={{
    //             pathname: `/products/${product.id}`,
    //             search: `?collection=${product.collection}`,
    //             state: {
    //               title: product.name,
    //               product: product
    //             }
    //           }} >
    //             <img className={styles.product__img} src={product.image.url} alt={product.image.alt} />
    //           <h3 className={styles.product__name}>{product.name}</h3>
    //           <p className={styles.product_desc}>{product.desc}</p>
    //           <p className={styles.product__price}>${product.price}</p>
    //         </Link>
    //       </article>
    //     )
    //   )
    // }
  );
  
};

export default Product;