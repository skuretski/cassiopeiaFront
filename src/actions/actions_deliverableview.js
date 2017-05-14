import axios from 'axios';
import { PROJECTS } from '../api';

export function getDeliverableViewData(project_id, deliverable_id){
    return function(dispatch){
        return axios.get(`${PROJECTS}/${project_id}/deliverables/${deliverable_id}/tasks`)
        .then((response) => {
            dispatch(setDelivTasks(response.data));
        }).catch((error) => {
            console.log(error);
        });
    
    }
}

export const setDelivTasks = (deliverableTasks) => {
    return{
        type: 'GET_DELIVERABLE_TASKS',
        deliverableTasks
    }
}