import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'src/services/api';
import { createProjectRequest, createProjectSuccess, getProjectsSuccess } from './action';
import { ActionTypes } from './interface';
import toastrActions from '../toast/action';

function* getProjects() {
    try
    {
        const response = yield call(api.get, 'projects');

        yield put(getProjectsSuccess(response.data));
    }
    catch(err)
    {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to load projects Failed',
                message: 'Refresh the page or try again later'
            })
        )
    }

  
}

type IProject = ReturnType<typeof createProjectRequest>;

function* createProject({payload}: IProject){
    try{
        const {title} = payload;
        const response = yield call(api.post, 'projects', {title});

        yield put(createProjectSuccess(response.data));
    }catch(err){
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to create project Failed',
                message: 'Refresh the page or try again later'
            })
        ) 
    }

}

export default all([
    takeLatest(ActionTypes.GetProjectsRequest, getProjects),
    takeLatest(ActionTypes.CreateProjectRequest, createProject)
]);