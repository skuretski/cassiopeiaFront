import axios from 'axios';
import { FUNDING } from '../../api';

export function getFunding(dispatch){
    return axios.get(FUNDING)
    .then((response) => {
        dispatch(setFunding(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function createFunding(data, callback) {
    console.log(data);
    const request = axios.post(FUNDING, {
        start_date: data.start_date,
        end_date: data.end_date,
        amount: data.amount,
        project_id: data.project_id,
        type_id: data.type_id
    }).then( (value) => callback(value));

    return {
        type: 'ADD_FUNDING',
        payload: request
    }
}

export function updateFunding(data, callback) {
    const request = axios.put(`${FUNDING}/${data.id}`, { effort: data.amount })
        .then( (value) => callback(value));

    return {
        type: 'UPDATE_FUNDING',
        payload: request
    }
}

export function deleteAssignment(data, callback) {
    const request = axios.delete(`${FUNDING}/${data.id}`)
        .then( (value) => callback(value));

    return {
        type: 'DELETE_FUNDING',
        payload: request
    }
}

// Expects data to be an object
export function searchFunding(data, callback) {
    // Turn data into query param string
    // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object/1714899#1714899
    var qParam = Object.keys(data).map( k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
    const url = `${FUNDING}/search?${qParam}`;

    const request = axios.get(url, {
    }).then( (response) => {
        callback(response, data)});

    return {
        type: 'SEARCH_FUNDING',
        payload: request
    }
}

export const setFunding = (funding) => {
    return{
        type: 'GET_FUNDING',
        funding
    }
}

