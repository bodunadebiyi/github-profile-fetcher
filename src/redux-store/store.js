import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer, { defaultState } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    return composeEnhancers(
        applyMiddleware(
            thunk, 
            logger
        )
    )
}

export default createStore(
    rootReducer, 
    defaultState, 
    configureStore()
);