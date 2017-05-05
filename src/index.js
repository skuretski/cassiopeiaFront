import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import routes from './routes';

const configuredStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);


ReactDOM.render(
    <Provider store = {configuredStore}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.querySelector('.container')
);