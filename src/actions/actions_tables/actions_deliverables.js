import axios from 'axios';
import { DELIVERABLES } from '../../api';

export function getDeliverables(dispatch){
    return axios.get(DELIVERABLES)
    .then((response) => {
        dispatch(setDeliverables(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function addDeliverable(deliverable){
    return function(dispatch){
        if(deliverable.title === '' || deliverable.description === '' || deliverable.project_id === ''){
            console.log("Error. Fields must be filled out.");
        }
        else{
            return axios.post(DELIVERABLES,{
                title: deliverable.title,
                description: deliverable.description,
                project_id: deliverable.project_id
            }).then((response) => {
                dispatch(createDeliverable(response.data[0]));
            }).catch((error) => {
                console.log(error);
            });
        }
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

export const createDeliverable = (newDeliverable) => {
    return {
        type: 'ADD_DELIVERABLE',
        deliverable: newDeliverable
    }
}