import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth/reducer';
import project from './project/reducer';
import member from './member/reducer';
import team from './team/reducer';
import toastr from './toast/reducer';
import history from './history/reducer';

export default combineReducers({
    auth,
    project,
    member,
    team,
    toastr,
    router: connectRouter(history)
});