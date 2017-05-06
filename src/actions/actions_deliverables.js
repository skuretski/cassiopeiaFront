import axios from 'axios';
import { DELIVERABLES } from '../api';

export function getDeliverables(dispatch){
    return axios.get(DELIVERABLES)
    .then((response) => {
        dispatch(setDeliverables(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function selectDeliverable(dispatch){
    return function(dispatch){
        
    }
}
export const setDeliverables = (deliverables) => {
    return{
        type: 'GET_DELIVERABLES',
        deliverables
    }
}

export const selectOneDeliverable = (deliverable_id) => {
    return{
        type: 'SELECT_DELIVERABLE',
        deliverable_id
    }
}