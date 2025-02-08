import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducers'
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

// ** init middleware
let middleware = [thunk, logger, createDebounce()]



// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

export { store }