import React from 'react';
import {Link, Redirect, RouteProps, useParams, useLocation} from 'react-router-dom';
import styles from './index.scss';

interface IProps {
  crumbs: any;
  path: string;
}

type Props = IProps & RouteProps;

const Breadcrumb = (props: Props) => {
  // let params = useParams();
  let location = useLocation();
  let splitQuery = location.search.split('=') || '';
  let collection = splitQuery[1];
  
  const { crumbs, path } = props;
  // console.log("crumbs: " + crumbs)
  // console.log("path: " + path)

  // if (crumbs.length <= 1) return null;

  if (crumbs.length <= 1 || path === "/" || path === "/shop/cart") return null;

  let listItems = crumbs.map(({ title, path, redirect }: any, key: number) =>
  key + 1 === crumbs.length
  ? (<li key={key}><span>{title}</span></li>)
  : redirect 
    ? (<li key={key}>
        <Link 
        to={{
          pathname: `${redirect.to}/${collection}`,
          state: {
            title: collection === 'face-care' ? 'Face Care' : 'Body Care'
          }
        }}
        >{collection === 'face-care' ? 'Face Care' : 'Body Care'}</Link>
      </li>)
    : (<li key={key}><Link to={path}>{title}</Link></li>)
  );

  return(
    <div className={styles.breadcrumbs__wrapper}>
      <ul className={styles.breadcrumbs}>{listItems}</ul>
    </div>
  );
};

export default Breadcrumb;