import axios from 'axios';
import { ASSIGNMENTS } from '../../api';

export function createAssignment(data, callback) {
    const request = axios.post(ASSIGNMENTS, {
        start_date: data.start_date,
        end_date: data.end_date,
        effort: data.effort,
        employee_id: data.employee_id,
        task_id: data.task_id
    }).then( (value) => callback(value));

    return {
        type: 'ADD_ASSIGNMENT',
        payload: request
    }
}

export function updateAssignment(data, callback) {
    const request = axios.put(`${ASSIGNMENTS}/${data.id}`, { effort: data.effort })
        .then( (value) => callback(value));

    return {
        type: 'UPDATE_ASSIGNMENT',
        payload: request
    }
}

export function deleteAssignment(data, callback) {
    const request = axios.delete(`${ASSIGNMENTS}/${data.id}`)
        .then( (value) => callback(value));

    return {
        type: 'DELETE_ASSIGNMENT',
        payload: request
    }
}

// Expects data to be an object
export function searchAssignments(data, callback) {
    // Turn data into query param string
    // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object/1714899#1714899
    var qParam = Object.keys(data).map( k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
    const url = `${ASSIGNMENTS}/search?${qParam}`;

    const request = axios.get(url, {
    }).then( (response) => {
        callback(response, data)});

    return {
        type: 'SEARCH_ASSIGNMENT',
        payload: request
    }
}