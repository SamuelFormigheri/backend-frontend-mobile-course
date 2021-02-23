import { routerMiddleware } from 'connected-react-router';

import history from './reducer';

const middleware = routerMiddleware(history);

export default middleware;