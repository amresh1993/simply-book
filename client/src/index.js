import React from 'react';
import ReactDOM from 'react-dom';


//Redux
import { Provider } from 'react-redux';

// local store
import store from './redux/store'

// antd css
import 'antd/dist/antd.css';
import './index.css';
// root component
import App from './App';

import * as serviceWorker from './serviceWorker';

// the store configured is mapped here to the component via Provider
ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
