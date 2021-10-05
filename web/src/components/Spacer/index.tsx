import React from 'react';
import {RouteProps} from 'react-router-dom';

import styles from './index.scss';

const Spacer = (props: RouteProps) => 
(<div className={styles.spacer}>
  {props.children}
</div>);

export default Spacer;