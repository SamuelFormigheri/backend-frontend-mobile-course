import { ActionTypes, IMemberState, Roles } from "./interface";

export function getMembersRequest(){
    return {
        type: ActionTypes.GetMembersRequest,
        payload: {
        }
    }
}

export function getMembersSuccess(data: IMemberState){
    return {
        type: ActionTypes.GetMembersSuccess,
        payload: {
            data
        }
    }
}

export function updateMemberRequest(id: number, roles: Roles[]){
    return {
        type: ActionTypes.UpdateMemberRequest,
        payload: {
            id,
            roles
        }
    }
}

export function inviteMemberRequest(email: string){
    return {
        type: ActionTypes.InviteMemberRequest,
        payload: {
            email
        }
    }
}