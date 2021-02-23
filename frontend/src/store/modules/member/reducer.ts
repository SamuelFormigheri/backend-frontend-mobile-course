import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IMemberState } from './interface';

const INITIAL_STATE: IMemberState = {
    data: [],
};

const member: Reducer<IMemberState> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ActionTypes.GetMembersSuccess: {
                draft.data = action.payload.data;
                break;
            }
            case ActionTypes.UpdateMemberRequest: {
                const {id, roles} = action.payload;
                draft.data = draft.data.map(member => (member.id === id) ? {...member, roles} : member)
                break;
            }
            default: 
                return draft;
        }
    });
}

export default member;