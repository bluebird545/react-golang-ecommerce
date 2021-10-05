import React from 'react';
import {Route, Switch, useParams, useLocation, Redirect} from 'react-router-dom';
import Home from './pages/Home/index';
import About from './pages/About/index';
import Cart from './pages/Cart/index';
import ProductDetails from './pages/ProductDetails/index';
import ProductView from './containers/ProductView';
import Breadcrumb from '@components/Breadcrumb';
import Checkout from './pages/Checkout';

const routes = [
  { 
    path: '/', 
    title: 'Home', 
    Component: Home 
  },
  { 
    path: '/about', 
    title: 'About', 
    Component: About 
  },
  {
    path: '/shop/cart',
    Component: Cart
  },
  {
    path: '/collections',
    title: ''
  },
  { 
    redirect: {
      path: '/collections/:collection',
      to: '/collections'
    },
    path: '/products',
    title: '', 
    Component: ProductView
  },
  { 
    path: '/products/:id', 
    title: '', 
    Component: ProductDetails 
  },
  {
    path: '/checkout',
    title: 'Checkout',
    Component: Checkout
  }
];

const Routing = () => {
  return (
    <Switch>
      {
        routes.map(({ path, redirect, Component}, key) => (
          <Route 
            key={key} 
            exact 
            path={redirect ? redirect.path : path} 
            render={props => {              
              const crumbs = routes
                .filter(({ path }) => props.match.path.includes(path))
                .map(({ path, title, ...rest }) => ({
                  path: Object.keys(props.match.params).length ? Object.keys(props.match.params).reduce((path, param) => path.replace(`:${param}`, props.match.params[param]), path) : path,
                  title: title === '' ? props.location.state.title : title,
                  ...rest
                }));

              // console.log(`Generated crumbs for ${props.match.path}`);
              // crumbs.map(({ title, path, ...rest }) => console.log({ title, path }));         

              return (
                <div>                  
                  <Breadcrumb crumbs={crumbs} path={path} />
                  <Component {...props} />
                </div>
              );
            }}
          />
        ))
      }
      {/* <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/about" component={About} />
      <Route 
        exact={true} 
        path="/face-care" 
        render={() => {
          return(
            <h1>Face Care</h1>
          );
        }} 
      />
      <Route 
        exact={true} 
        path="/body-care"
        render={() => {
          return(
            <h1>Face Care</h1>
          );
        }}  
      />
      <Route 
        exact={true} 
        path="/:category/product/:id?" 
        // component={ProductDetails}
        render={props => {
                 

          return(
            <ProductDetails {...props} />
          );
        }}
      />
      <Route 
        exact={true} 
        path="/example" 
        // component={ProductDetails}
        render={props => {
          const crumbs = () => {

          };

          return(
            <ProductDetails {...props} />
          );
        }}
      /> */}
    </Switch>
  );
};

export default Routing;