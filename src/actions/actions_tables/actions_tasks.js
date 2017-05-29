import axios from 'axios';
import { TASKS } from '../../api';

export function getTasks(dispatch){
    return axios.get(TASKS)
    .then((response) => {
        dispatch(setTasks(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function addTask(task){
    return function(dispatch){
        if(task.title === '' || task.description === '' || task.committed === '' || task.discipline_id === ''){
            console.log("Error. Fields must be filled out.");
        }
        else{
            return axios.post(TASKS, {
                title: task.title,
                description: task.description,
                committed: task.committed,
                discipline_id: task.discipline_id,
                deliverable_id: task.deliverable_id
            }).then((response) => {
                dispatch(createTask(response.data[0]));
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}

export const setTasks = (tasks) => {
    return{
        type: 'GET_TASKS',
        tasks
    }
}

export const createTask = (newTask) => {
    return{
        type: 'ADD_TASK',
        task: newTask
    }
}