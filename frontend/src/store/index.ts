import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootMiddlewares';

import historyMiddleware from './modules/history/middlewares';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, historyMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;