import React from 'react';

import Spacer from '@components/Spacer';
import QuickProductView from '../../containers/ProductView/QuickProductView';
import BannerImg from '@assets/homeBanner.png';
import Product1 from '@assets/product_1.jpg';
import Product2 from '@assets/product_2.jpg';

import styles from './index.scss';

const Home = () => {
  return (
    <div id="content" className={styles.home}>
      <section className={styles.banner}>
        <div className={styles['banner__image-container']}>
          <img className={styles['banner-image']} src={BannerImg} alt="Brand" />
        </div>
        <div className={styles['banner__text-container']}>
          <span className={styles['banner-text']}>
            <p className={styles['banner-text__h1']}>Beauty products made from</p>
            <p className={styles['banner-text__h2']}>the mind & heart</p>
            <button className={styles['banner-text__btn']}>SHOP NOW</button>
          </span>
        </div>
      </section>

      <Spacer>
        <p className={styles.spacerText} style={{'fontSize': '30px'}}>Natural, Effective, and Precise in every bottle</p>
      </Spacer>

      <section className={styles.this}>
        <div className={styles['this-content']}>
          <div className={styles.left}>
            <img className={styles.image} src={Product1} alt="" />
            <p className={styles.text}>
              <span className={styles['bold-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
              Nisi atque minima vero consectetur accusamus sunt earum, obcaecati facilis deserunt voluptatum dolorem eius sed corporis expedita perspiciatis inventore molestiae neque sint?
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.text}>
              <span className={styles['bold-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
              Similique harum velit hic odit excepturi iure, assumenda laborum modi aspernatur adipisci provident nemo molestiae sunt ea quisquam laboriosam enim, quas pariatur!
            </p> 
            <img className={styles.image} src={Product2} alt="" />
          </div>
        </div>
      </section>

      <Spacer />

      <section className={styles.this2}>
        <div className={styles.content}>
          <p className={styles.h3}>First Collection</p>
          <QuickProductView />
          {/* <button>SHOP ALL</button> */}
        </div>
      </section>

      <Spacer />

    </div>
  );
};

export default Home;