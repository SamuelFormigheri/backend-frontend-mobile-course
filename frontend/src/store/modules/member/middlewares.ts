import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'src/services/api';
import { getMembersSuccess, inviteMemberRequest, updateMemberRequest } from './action';
import { ActionTypes, Roles } from './interface';
import toastrActions from '../toast/action';

function* getMembers() {
    try
    {
        const response = yield call(api.get, 'members');

        yield put(getMembersSuccess(response.data));
    }
    catch(err)
    {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to load members Failed',
                message: 'Refresh the page or try again later'
            })
        )
    }

  
}

type IMembers = ReturnType<typeof updateMemberRequest>;

function* updateMember({payload}: IMembers){
    try{
        const {id, roles} = payload;
        yield call(api.put, `members/${id}`, {roles : roles.map((role: Roles) => role.id)});
        yield put(toastrActions.add({
            type: 'success',
            title: 'Success',
            message: 'Member updated Successfully'
        }));
    }catch(err){
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to update member Failed',
                message: 'Refresh the page or try again later'
            })
        ) 
    }
}

type IInvite = ReturnType<typeof inviteMemberRequest>;

function* inviteMember({payload}: IInvite){
    try{
       const {email} = payload;
       yield call(api.post, 'invites', {invites: [email]});
       yield put(toastrActions.add({
            type: 'success',
            title: 'Success',
            message: 'Invitation sent'
        }));
    }catch(err){
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Attempt to invite member Failed',
                message: 'Refresh the page or try again later'
            })
        ) 
    }

}

export default all([
    takeLatest(ActionTypes.GetMembersRequest, getMembers),
    takeLatest(ActionTypes.UpdateMemberRequest, updateMember),
    takeLatest(ActionTypes.InviteMemberRequest, inviteMember)
]);