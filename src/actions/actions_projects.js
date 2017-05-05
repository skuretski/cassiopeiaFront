import axios from 'axios';
import { PROJECTS } from '../api';

export function getProjects(dispatch){
    return axios.get(PROJECTS)
    .then((response) => {
        dispatch(setProjects(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function selectProject(dispatch){
    return function(dispatch){
        
    }
}
export const setProjects = (projects) => {
    return{
        type: 'GET_PROJECTS',
        projects
    }
}

export const selectOneProject = (project_id) => {
    return{
        type: 'SELECT_PROJECT',
        project_id
    }
}