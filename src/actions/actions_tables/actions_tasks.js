import axios from 'axios';
import { TASKS } from '../../api';
import { addAlert } from '../../actions';

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
            dispatch(addAlert("Error. Fields must be filled out."));
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
                return response.data[0].id;
            }).catch((error) => {
                if(error.response.status && error.response.status == 400){
                    dispatch(addAlert(error.response.data.error));
                } else{
                    dispatch(addAlert("Error: could not add task."));
                }
            });
        }
    }
}

export function updateTask(data) {
    return dispatch => {
        dispatch(updateTaskHasErrored(false));
        return axios.put(TASKS, data)
            .then ( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(updateTaskSuccess(response.data.changedRows));
            }).catch( error => {
                dispatch(updateTaskHasErrored(true));
                console.log(error);
            });
    }
}

export function getTaskById(task_id) {
    return dispatch => {
        dispatch(getTaskHasErrored(false));
        const url = `${TASKS}/${task_id}`;
        return axios.get(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(getTaskSuccess(response.data[0]));
            }).catch( error => {
                dispatch(getTaskHasErrored(true));
                console.log(error);
            });
    };
}

export function deleteTask(task_id) {
    return dispatch => {
        dispatch(deleteTaskHasErrored(false));
        const url = `${TASKS}/${task_id}`;
        return axios.delete(url)
            .then( response => {
                if (response.status !== 200 || response.data.error) {
                    if (response.data.error) {
                        throw Error(response.data.error);
                    } else {
                        throw Error(response.statusText);
                    }
                }
                dispatch(deleteTaskSuccess(response.data.affectedRows));
            }).catch( error => {
                dispatch(deleteTaskHasErrored(true));
            });
    };
}

export function deleteTaskHasErrored(bool) {
    return {
        type: 'DELETE_TASK_HAS_ERRORED',
        hasErrored: bool
    };
}

export function deleteTaskSuccess(affectedRows) {
    return {
        type: 'DELETE_TASK_SUCCESS',
        affectedRows
    }
}

export function getTaskHasErrored(bool) {
    return {
        type: 'GET_TASK_HAS_ERRORED',
        hasErrored: bool
    }
}

export function getTaskSuccess(task) {
    return {
        type: 'GET_TASK_SUCCESS',
        task
    }
}

export function updateTaskHasErrored(bool) {
    return {
        type: 'UPDATE_TASK_HAS_ERRORED',
        hasErrored: bool
    }
}

export function updateTaskSuccess(changedRows) {
    return {
        type: 'UPDATE_TASK_SUCCESS',
        changedRows
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