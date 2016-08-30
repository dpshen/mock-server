import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../libs/api'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api)
  )
}
