import axios from 'axios';
import { PROJECTS } from '../../api';
import { addAlert, deleteAlert } from '../../actions';

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
        if(project.title == "" || project.description == "" || project.title == null || project.description == null){
            dispatch(addAlert("Error. Fields must be filled out."));
        }
        else{
            return axios.post(PROJECTS, {
                title: project.title,
                description: project.description
            }).then((response) => {
                return dispatch(createProject(response.data[0]));
            }).catch((error) => {
                console.log(error);
                dispatch(addAlert(error.data));
            });
         }
    }
}

export function updateProject(data) {
    return dispatch => {
        dispatch(updateProjectHasErrored(false));
        return axios.put(PROJECTS, data)
            .then ( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(updateProjectSuccess(response.data.changedRows));
            }).catch( error => {
                dispatch(updateProjectHasErrored(true));
                console.log(error);
            });
    }
}

export function getProjectById(project_id) {
    return dispatch => {
        dispatch(getProjectHasErrored(false));
        const url = `${PROJECTS}/${project_id}`;
        return axios.get(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(getProjectSuccess(response.data[0]));
            }).catch( error => {
                dispatch(getProjectHasErrored(true));
                console.log(error);
            });
    };
}

export function getProjectHasErrored(bool) {
    return {
        type: 'GET_PROJECT_HAS_ERRORED',
        hasErrored: bool
    }
}

export function getProjectSuccess(project) {
    return {
        type: 'GET_PROJECT_SUCCESS',
        project
    }
}

export function updateProjectHasErrored(bool) {
    return {
        type: 'UPDATE_PROJECT_HAS_ERRORED',
        hasErrored: bool
    }
}

export function updateProjectSuccess(changedRows) {
    return {
        type: 'UPDATE_PROJECT_SUCCESS',
        changedRows
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