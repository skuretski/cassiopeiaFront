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

export const setProjects = (projects) => {
    return{
        type: 'GET_PROJECTS',
        projects
    }
}

export function selectOneProject(project){
    return{
        type: 'SELECT_PROJECT',
        project
    }
}