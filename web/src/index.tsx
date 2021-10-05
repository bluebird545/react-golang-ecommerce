import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Router } from 'react-router-dom';
// import { history } from './history';
// import store from './redux/store';
// import { Provider } from 'react-redux';

import '@styles/main.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(<Router history={history}> <App /> </Router>,document.getElementById('root'));

// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <App />
//         </Router>
//     </Provider>, 
//     document.getElementById('root'));