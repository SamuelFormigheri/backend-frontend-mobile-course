import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects';
import {push} from 'connected-react-router';
import api from 'src/services/api';
import { GetPermissionsSuccess, signInRequest, signInSuccess, signUpRequest } from './action';
import { ActionTypes } from './interface';
import toastrActions from '../toast/action';

type IUser = ReturnType<typeof signInRequest>;

function* proceedToLoginValidation({payload}: IUser) {
    const { user } = payload;
    try
    {
        const response = yield call(api.post, 'sessions', user);
        localStorage.setItem('@Frontend:token', response.data.token);

        yield put(signInSuccess(response.data.token));
        yield put(push('/'));
    }
    catch(err)
    {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Login Failed',
                message: 'Verify your EMAIL or PASSWORD!'
            })
        )
    }

  
}

function* logout(){
    localStorage.removeItem('@Frontend:token');
    localStorage.removeItem('@Frontend:team');
    yield put(push('/signin'));
}

type IUserCreate = ReturnType<typeof signUpRequest>;

function* signUp({payload}: IUserCreate){
    const { user } = payload;
    try
    {
        console.log(user);
        const response = yield call(api.post, 'users', user);
        localStorage.setItem('@Frontend:token', response.data.token);

        yield put(signInSuccess(response.data.token));
        yield put(push('/'));
    }
    catch(err)
    {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Registration Failed',
                message: 'You must be invited to be able to register!'
            })
        )
    }
}

export function* getPermissions() {
    const team = yield select(state => state.team.active);
    const signedIn = yield select(state => state.auth.signedIn);

    if(!signedIn || !team)
        return;
    
    const response = yield call(api.get, 'permissions');
    const {roles, permissions} = response.data;

    yield put(GetPermissionsSuccess(roles, permissions));
}

export default all([
    fork(getPermissions),
    takeLatest(ActionTypes.SignInRequest, proceedToLoginValidation),
    takeLatest(ActionTypes.SignOut, logout),
    takeLatest(ActionTypes.SignUpRequest, signUp),
]);