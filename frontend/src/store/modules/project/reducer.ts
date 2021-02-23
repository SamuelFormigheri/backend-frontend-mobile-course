import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IProjectState } from './interface';

const INITIAL_STATE: IProjectState = {
    data: [],
    active: JSON.parse(localStorage.getItem('@Frontend:team') || '{}') || null
};

const project: Reducer<IProjectState> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ActionTypes.GetProjectsSuccess: {
                draft.data = action.payload.data;
                break;
            }
            case ActionTypes.CreateProjectSuccess: {
                draft.data.push(action.payload.project);
                break;
            }
            // case ActionTypes.SelectProject: {
            //     localStorage.setItem('@Frontend:project', JSON.stringify(action.payload.project));
            //     draft.active = action.payload.project;
            //     break;
            // }
            default: 
                return draft;
        }
    });
}

export default project;