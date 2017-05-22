import axios from 'axios';
import { PROJECTS } from '../../api';

export function getProjects(dispatch){
    return axios.get(PROJECTS)
    .then((response) => {
        dispatch(setProjects(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function addProject(project){
    return function(dispatch){
        if(project.title === '' || project.description === ''){
            console.log("Error. Fields must be filled out.");
        }
        else{
            return axios.post(PROJECTS, {
                title: project.title,
                description: project.description
            }).then((response) => {
                dispatch(createProject(response.data[0]));
            }).catch((error) => {
                console.log(error);
            });
         }
    }
}

export const setProjects = (projects) => {
    return{
        type: 'GET_PROJECTS',
        projects
    }
}

export const selectOneProject = (project) => {
    return{
        type: 'SELECT_PROJECT',
        project
    }
}

export const createProject = (newProject) => {
    return{
        type: 'ADD_PROJECT',
        project: newProject
    }
}