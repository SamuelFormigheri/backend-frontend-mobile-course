export enum ActionTypes{
    GetProjectsRequest = 'GET_PROJECTS_REQUEST',
    GetProjectsSuccess = 'GET_PROJECTS_SUCCESS',
    CreateProjectRequest = 'CREATE_PROJECT_REQUEST',
    CreateProjectSuccess = 'CREATE_PROJECT_SUCCESS'
} 

export interface Project{
    id: number;
    title: string;
    slug: string;
}

export interface IProjectState{
    data: Project[];
    active: Project;
}