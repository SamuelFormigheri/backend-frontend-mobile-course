import { ActionTypes, ITeamState, Team } from "./interface";

export function getTeamsRequest(){
    return {
        type: ActionTypes.GetTeamsRequest,
        payload: {
        }
    }
}

export function getTeamsSuccess(data: ITeamState){
    return {
        type: ActionTypes.GetTeamsSuccess,
        payload: {
            data
        }
    }
}

export function selectTeam(team: Team){
    return {
        type: ActionTypes.SelectTeam,
        payload: {
            team
        }
    }
}

export function createTeamRequest(name: string){
    return {
        type: ActionTypes.CreateTeamRequest,
        payload: {
            name
        }
    }
}

export function createTeamSuccess(team: Team){
    return {
        type: ActionTypes.CreateTeamSuccess,
        payload: {
            team
        }
    }
}