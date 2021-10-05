import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routing from './Routing';
// import Nav from './components/Nav/index';
import Nav from '@components/Nav/index';
import Footer from './components/Footer/index';
import {Provider} from 'react-redux';
import store from './redux/store';

const crumbs = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/about',
    title: 'About',
  },
  {
    path: '/collections/:collection',
    title: '',
  },
  {
    path: '/products/:id?collection=',
    title: '',
  },
];
class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
            <Routing />
          <Footer />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;

// import React, { useState } from 'react';
// import mainStyles from "./styles/main.scss";


// export default () => {
//     // instead of variable, you need array
//     // 1st element is the variable, 2nd variable a function to modify "age"
//     // useState()'s takes in the default value, takes place of "setState"
//     const [age, setAge] = useState(21);
//     const [name, setName] = useState('Fatima');

//     const ageUp = () => {
//         setAge(age + 1)
//     }

//     const nameChange = (e) => {
//         setName(e.target.value);
//     }

//     return (
//         // <h1>This is your React + Webpack + Babel App</h1> 
//         <div>
//             <p>Name: <input type="text" value={name} onChange={nameChange}></input></p><br />
//             <p>Age: {age}</p><br />
//             <button onClick={ageUp}>Age Up</button><br />
//             <br />
//             <br />
//             <h1>{name} is {age} year(s) old!</h1>
//         </div>
//     );
// };

