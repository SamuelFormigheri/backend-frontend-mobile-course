import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, ITeamState } from './interface';

const INITIAL_STATE: ITeamState = {
    data: [],
    active: JSON.parse(localStorage.getItem('@Frontend:team') || '{}') || null
};

const team: Reducer<ITeamState> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ActionTypes.GetTeamsSuccess: {
                draft.data = action.payload.data;
                break;
            }
            case ActionTypes.CreateTeamSuccess: {
                draft.data.push(action.payload.team);
                break;
            }
            case ActionTypes.SelectTeam: {
                localStorage.setItem('@Frontend:team', JSON.stringify(action.payload.team));
                draft.active = action.payload.team;
                break;
            }
            default: 
                return draft;
        }
    });
}

export default team;