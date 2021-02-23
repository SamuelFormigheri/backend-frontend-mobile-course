export enum ActionTypes{
    SignInRequest = 'SIGN_IN_REQUEST',
    SignInSuccess = 'SIGN_IN_SUCCESS',
    SignOut = 'SIGN_OUT',
    SignUpRequest = 'SIGN_UP_REQUEST',
    GetPermissionsSuccess = 'GET_PERMISSIONS_SUCCESS'
} 

export interface IUser{
    email: string;
    password: string;
}


export interface IUserState {
    signedIn: boolean;
    token: string;
    roles: string[],
    permissions: string[];
}

export interface IUserCreate{
    username: string;
    email: string;
    password: string;
}