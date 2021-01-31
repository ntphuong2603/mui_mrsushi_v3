import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise'
import reducersIndex from './reducers/reducersIndex';

const MrSushiStore = () => {
    const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        reducersIndex,
        composeEnhances(applyMiddleware(promiseMiddleware))
    )

    return store;
}

export default MrSushiStore;