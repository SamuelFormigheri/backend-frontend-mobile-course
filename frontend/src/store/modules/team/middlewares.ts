import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'src/services/api';
import { createTeamRequest, createTeamSuccess, getTeamsSuccess } from './action';
import { ActionTypes } from './interface';
import toastrActions from '../toast/action';
import {getPermissions} from '../auth/middlewares';

function* getTeams() {
    try
    {
        const response = yield call(api.get, 'teams');

        yield put(getTeamsSuccess(response.data));
    }
    catch(err)
    {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to load teams Failed',
                message: 'Refresh the page or try again later'
            })
        )
    }

  
}

type ITeam = ReturnType<typeof createTeamRequest>;

function* createTeam({payload}: ITeam){
    try{
        const {name} = payload;
        const response = yield call(api.post, 'teams', {name});
        console.log(response);
        yield put(createTeamSuccess(response.data));
    }catch(err){
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to create team Failed',
                message: 'Refresh the page or try again later'
            })
        ) 
    }

}

export default all([
    takeLatest(ActionTypes.GetTeamsRequest, getTeams),
    takeLatest(ActionTypes.CreateTeamRequest, createTeam),
    takeLatest(ActionTypes.SelectTeam, getPermissions)
]);