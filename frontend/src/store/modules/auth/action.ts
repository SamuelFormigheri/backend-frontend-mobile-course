import { ActionTypes, IUser, IUserCreate } from "./interface";

export function signInRequest(user: IUser){
    return {
        type: ActionTypes.SignInRequest,
        payload: {
            user
        }
    }
}

export function signInSuccess(token: string){
    return {
        type: ActionTypes.SignInSuccess,
        payload: {
            token
        }
    }
}

export function signOut(){
    return {
        type: ActionTypes.SignOut,
        payload: {
        }
    }
}

export function signUpRequest(user: IUserCreate){
    return {
        type: ActionTypes.SignUpRequest,
        payload: {
            user
        }
    }
}

export function GetPermissionsSuccess(roles: string[], permissions: string[]){
    return {
        type: ActionTypes.GetPermissionsSuccess,
        payload: {
            roles,
            permissions
        }
    }
}