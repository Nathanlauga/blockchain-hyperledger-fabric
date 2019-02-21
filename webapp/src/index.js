import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import setAuthorizationToken from './services/setAuthorizationToken';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

// Actions
import {
    fetchProfile
} from './actions/auth/index'

import {
    AUTH_USER
} from './actions/auth/types'

// Reducers
import reducers from './reducers';

// Bootstrap, fontawesome
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

// Components
import App from './components/App';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    setAuthorizationToken(token);
    store.dispatch({ type: AUTH_USER });
    store.dispatch(fetchProfile())
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
