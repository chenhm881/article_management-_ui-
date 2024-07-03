import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from "./redux/rootReducer";
import thunk from "redux-thunk";
const composeEnhancers = (window as any) && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;


const store = createStore(
    rootReducer,
);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);


