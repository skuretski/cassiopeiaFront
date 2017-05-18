import axios from 'axios';
import { TASKVIEW } from '../../api';

export function getTaskViewData(id) {
    return function(dispatch){
        return axios.get(`${TASKVIEW}/${id}`)
        .then((response) => {
            dispatch(setTaskViewData(response.data));
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const setTaskViewData = (taskViewData) => {
    return {
        type: 'GET_TASKVIEWDATA',
        taskViewData
    }
}