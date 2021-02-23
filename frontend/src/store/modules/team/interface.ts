export enum ActionTypes{
    GetTeamsRequest = 'GET_TEAMS_REQUEST',
    GetTeamsSuccess = 'GET_TEAMS_SUCCESS',
    SelectTeam = 'SELECT_TEAM',
    CreateTeamRequest = 'CREATE_TEAM_REQUEST',
    CreateTeamSuccess = 'CREATE_TEAM_SUCCESS'
} 

export interface Team{
    id: number;
    name: string;
    slug: string;
}

export interface ITeamState{
    data: Team[];
    active: Team;
}