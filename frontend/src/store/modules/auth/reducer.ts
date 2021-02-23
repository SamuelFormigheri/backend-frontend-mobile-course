import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUserState } from './interface';

const INITIAL_STATE: IUserState = {
    signedIn: !!localStorage.getItem('@Frontend:token'),
    token: localStorage.getItem('@Frontend:token') || "",
    roles: [],
    permissions: []
};

const auth: Reducer<IUserState> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ActionTypes.SignInSuccess: {
                const {token} = action.payload;

                draft.signedIn = true;
                draft.token = token;
                break;
            }
            case ActionTypes.SignOut: {
                draft.signedIn = false;
                draft.token = "";
                break;
            }
            case ActionTypes.GetPermissionsSuccess: {
                draft.roles = action.payload.roles;
                draft.permissions = action.payload.permissions;
                break;
            }
            default: 
                return draft;
        }
    });
}

export default auth;