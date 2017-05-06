import axios from 'axios';
import { TASKS } from '../api';

export function getTasks(dispatch){
    return axios.get(TASKS)
    .then((response) => {
        dispatch(setTasks(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export const setTasks = (tasks) => {
    return{
        type: 'GET_TASKS',
        tasks
    }
}

export const setTask = (task_id) => {
    return{
        type: 'SELECT_TASK',
        task_id
    }
}