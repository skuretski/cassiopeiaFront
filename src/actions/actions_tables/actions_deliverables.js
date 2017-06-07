import axios from 'axios';
import { DELIVERABLES } from '../../api';
import { addAlert } from '../../actions';

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
        if(deliverable.title == '' || deliverable.description == '' || deliverable.project_id == ''){
            dispatch(addAlert("Error. Fields must be filled out."));
        }
        else{
            return axios.post(DELIVERABLES,{
                title: deliverable.title,
                description: deliverable.description,
                project_id: deliverable.project_id
            }).then((response) => {
                dispatch(createDeliverable(response.data[0]));
                return response.data[0].id;
            }).catch((error) => {
                if(error.response.status && error.response.status == 400){
                    dispatch(addAlert(error.response.data.error));
                } else{
                    dispatch(addAlert("Error: could not add deliverable."));
                }
            });
        }
    }
}

export function updateDeliverable(data) {
    return dispatch => {
        dispatch(updateDeliverableHasErrored(false));
        return axios.put(DELIVERABLES, data)
            .then ( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(updateDeliverableSuccess(response.data.changedRows));
            }).catch( error => {
                dispatch(updateDeliverableHasErrored(true));
                console.log(error);
            });
    }
}

export function getDeliverableById(deliverable_id) {
    return dispatch => {
        dispatch(getDeliverableHasErrored(false));
        const url = `${DELIVERABLES}/${deliverable_id}`;
        return axios.get(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(getDeliverableSuccess(response.data[0]));
            }).catch( error => {
                dispatch(getDeliverableHasErrored(true));
                console.log(error);
            });
    };
}

export function deleteDeliverable(deliverable_id) {
    return dispatch => {
        dispatch(deleteDeliverableHasErrored(false));
        const url = `${DELIVERABLES}/${deliverable_id}`;
        return axios.delete(url)
            .then( response => {
                if (response.status !== 200 || response.data.error) {
                    if (response.data.error) {
                        throw Error(response.data.error);
                    } else {
                        throw Error(response.statusText);
                    }
                }
                dispatch(deleteDeliverableSuccess(response.data.affectedRows));
            }).catch( error => {
                dispatch(deleteDeliverableHasErrored(true));
            });
    };
}

export function deleteDeliverableHasErrored(bool) {
    return {
        type: 'DELETE_DELIVERABLE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function deleteDeliverableSuccess(affectedRows) {
    return {
        type: 'DELETE_DELIVERABLE_SUCCESS',
        affectedRows
    }
}

export function getDeliverableHasErrored(bool) {
    return {
        type: 'GET_DELIVERABLE_HAS_ERRORED',
        hasErrored: bool
    }
}

export function getDeliverableSuccess(deliverable) {
    return {
        type: 'GET_DELIVERABLE_SUCCESS',
        deliverable
    }
}

export function updateDeliverableHasErrored(bool) {
    return {
        type: 'UPDATE_DELIVERABLE_HAS_ERRORED',
        hasErrored: bool
    }
}

export function updateDeliverableSuccess(changedRows) {
    return {
        type: 'UPDATE_DELIVERABLE_SUCCESS',
        changedRows
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