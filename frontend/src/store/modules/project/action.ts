import { ActionTypes, IProjectState, Project } from "./interface";

export function getProjectsRequest(){
    return {
        type: ActionTypes.GetProjectsRequest,
        payload: {
        }
    }
}

export function getProjectsSuccess(data: IProjectState){
    return {
        type: ActionTypes.GetProjectsSuccess,
        payload: {
            data
        }
    }
}

export function createProjectRequest(title: string){
    return {
        type: ActionTypes.CreateProjectRequest,
        payload: {
            title
        }
    }
}

export function createProjectSuccess(project: Project){
    return {
        type: ActionTypes.CreateProjectSuccess,
        payload: {
            project
        }
    }
}