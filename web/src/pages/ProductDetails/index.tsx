import React, {FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faStar } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@components/Accordion/index';
import styles from './index.scss';

import * as shopActions from '../../redux/shop/shop.actions';
import * as shopSelectors from '../../redux/shop/shop.selectors';

import {combineClasses} from '@util';

interface IProps {
  product: {
    id: number;
    image: {
      url: string;
      alt: string;
    },
    price: number;
    name: string;
    desc: string;
    about: {
      ingredients: string[],
      instructions: string;
    }
    collection: string;
  };
}

type Props = RouteProps;

const ProductDetails = (props: Props) => {
  const { product } = props.location.state;  
  // console.log(props.location.state.product)
  const cart = useSelector(shopSelectors.cart);
  // console.log(cart)
  const dispatch = useDispatch();
  interface formInfo {
    bottleSize: {}
  }
  
  const initialForm: {[key: string]: string | any} = {
    bottleSize: {value: '', touched: false, valid: false}
  };
  const [form, setForm] = useState(initialForm);
  
  const initialState = {
    price: product.price,
    id: product.id,
    variantInfo: {}
    // productSize: '',
    // quantity: 1
  }
  // const [currentProduct, setProduct] = useState(initialState);
  const [currentProduct, setProduct] = useState<ShopAPI.CartProduct | undefined>(undefined);
  console.log(currentProduct);
  

  const [errors, setErrors] = useState<{[key: string]: string | number | any}>({});
  const [touched, setTouched] = useState<{[key: string]: string | number | any}>({});

  
  // handle all changes to form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(e.target)
    console.log(name)
    console.log(value)
    setForm(form => ({
      ...form, 
      [name]: {...form[name], value, touched: true}
    }));
    
    // remove previous errors
    const { [name]: removedError, ...rest}  = errors;
    setErrors({
      ...rest
    });
    
    // set which fields we're touched
    setTouched({
      ...touched,
      [name]: true
    });
    
    // update currentProduct object with user selected product size
    // setProduct({...currentProduct, productSize: value});
    // setProduct({id: product.id, name: product.name, quantity: 1, price: product.price, });
  };
  
  // return error message if an input is invalid
  const validateInput = (fieldName: any, fieldValue: string) => {    
    if (fieldName === 'bottleSize') {
      if (!fieldValue) {
        return 'Please pick a bottle size';
      }
      return null;
    }
  };
  // check is each input is valid
  // set any errors and which inputs were touched
  const validateForm = () => {
    const formValidation = Object.keys(form).reduce((acc, key: keyof formInfo) => {
      const newError = validateInput(key, form[key].value);
      const newTouched = { [key]: true };
      setForm({
        ...form, 
        [key]: {...form[key], touched: true}
      });
      return {
        errors: {
          ...acc.errors,
          ...(newError && { [key]: newError })
        },
        touched: {
          ...acc.touched,
          ...newTouched
        }
      }
    },
    {
      errors: { ...errors },
      touched: { ...touched }
    });
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      // Object.values(formValidation.touched).length ===
      //   Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every(t => t === true) // every touched field is true
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleAddToCart = (e: FormEvent) => {
    e.preventDefault();
    // check form for any invalid values
    const formValid = validateForm();
    if (formValid) {
      dispatch(shopActions.addToCart(currentProduct));      
    }
  };
  // handle addign a product to cart
  // const handleAddToCart = (e: HTMLFormElement, product: IProps["product"]) => {
  //   // check if product already exists in cart
  //   if (cart.items.some(products => products.productID === product.id)) {
  //     // update product's quantity in cart
  //     console.log("update quantity")
  //     dispatch(shopActions.updateCart(product.id, qty));
  //   } else {
  //     // add product to cart
  //     console.log("add to cart")
  //     // dispatch(shopActions.addToCart(product, qty));
  //   }
  // };
  
  // create li elements of each ingredient in product array
  let ingredientList: any = []; 
  product.about.ingredients.map(
    (ingredient: string, index: number) => {
      ingredientList.push(<li key={index}>{ingredient}</li>)
    }
  );

  return(
    <div className={styles.product__wrapper}>
      <section className={combineClasses(styles.product, styles.group)}>
        <article className={styles.product__img}>
          <img src={product.image.url} alt={product.image.alt} />
        </article>
        <article className={styles.product__details}>
          <div className={styles.descriptor}>
            <p className={styles.title}>{product.name}</p>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.rating}>
                <FontAwesomeIcon icon={faStar} className={combineClasses(styles.star, styles.filled)} />
                <FontAwesomeIcon icon={faStar} className={combineClasses(styles.star, styles.filled)} />
                <FontAwesomeIcon icon={faStar} className={combineClasses(styles.star, styles.filled)} />
                <FontAwesomeIcon icon={faStar} className={combineClasses(styles.star, styles.filled)} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
              <span>6 reviews</span>
            </div>
            <p className={styles.product__desc}>
              {product.desc}
            </p>
          </div>
          <form onSubmit={handleAddToCart} className={styles.addToCart__form}>
            <p>Select a size</p>
            <div className={styles['form-group']}>
              <div className={styles.options}>
                <div className={styles.option}>
                  <label htmlFor="size16">
                    <input type="radio" name="bottleSize" id="size16" value="size16" onChange={handleInputChange} />
                    <div className={styles.radioBox}>16oz</div>
                  </label>
                </div>

                <div className={styles.option}>
                  <label htmlFor="size24">
                    <input type="radio" name="bottleSize" id="size24" value="size24" onChange={handleInputChange} />
                    <div className={styles.radioBox}>24oz</div>
                  </label>
                </div>
              </div>
              <div className={combineClasses(styles.error)}>{ touched.bottleSize && errors.bottleSize }</div>
            </div>
            <div className={styles.addToCart__btn}>
              <button type="submit" className={styles.cart__btn}>Add to Cart</button>
            </div>
          </form>
          <div className={styles.extra}>
            <Accordion title="How To Use" content={<p>{product.about.instructions}</p>} />
            <Accordion title="Ingredients" content={<ul>{ingredientList}</ul>} />
          </div>
        </article>
      </section> 
    </div>
  );
};
export default ProductDetails;
