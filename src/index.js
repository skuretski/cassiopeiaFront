import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';


const configuredStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store = {configuredStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container-fluid')
);