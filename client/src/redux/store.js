import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducer'
import watchAll from './saga/root-saga';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers, // pass the reducers to the store
  applyMiddleware(sagaMiddleware) //create a store enhancer which will apply our sagaMiddleWare to store dispatch function
)
sagaMiddleware.run(watchAll) // run requires an argument that maps the sagas to sagaMiddleware 

export default store;