import {all} from 'redux-saga/effects';

import auth from './auth/middlewares';
import team from './team/middlewares';
import project from './project/middlewares';
import member from './member/middlewares';

export default function* rootSaga(){
    return yield all([
        auth,
        project,
        member,
        team
    ]);
}