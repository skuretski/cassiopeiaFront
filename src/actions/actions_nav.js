import axios from 'axios';
import { PROJECTS, DELIVERABLES, TASKS } from '../api';

export function fetchProjects(){
    return axios.get(PROJECTS)
    .then((response) =>{
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export function fetchTasks(){
    return axios.get(TASKS)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export function fetchDeliverables(){
    return axios.get(DELIVERABLES)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}
