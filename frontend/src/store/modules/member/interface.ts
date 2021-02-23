export enum ActionTypes{
    GetMembersRequest = 'GET_MEMBERS_REQUEST',
    GetMembersSuccess = 'GET_MEMBERS_SUCCESS',
    UpdateMemberRequest = 'UPDATE_MEMBER_REQUEST',
    InviteMemberRequest = 'INVITE_MEMBER_REQUEST'
} 

export interface Roles{
    id: number;
    slug: string;
    name: string;
}

export interface Member{
    id: number;
    user_id: number;
    team_id: number;
    user: {
        id: number;
        username: string;
        email: string;
    },
    roles: Roles[];
}

export interface IMemberState{
    data: Member[];
}