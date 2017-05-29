import axios from 'axios';
import { SOW } from '../../api';

export function createSOW(data, callback) {
    const request = axios.post(SOW, {
        start_date: data.start_date,
        end_date: data.end_date,
        man_mo: data.man_mo,
        task_id: data.task_id
    }).then( (value) => callback(value));

    return {
        type: 'ADD_SOW',
        payload: request
    }
}

export function updateSOW(data, callback) {
    const request = axios.put(`${SOW}/${data.id}`, { man_mo: data.man_mo })
        .then( (value) => callback(value));

    return {
        type: 'UPDATE_SOW',
        payload: request
    }
}

export function deleteSOW(data, callback) {
    const request = axios.delete(`${SOW}/${data.id}`)
        .then( (value) => callback(value));

    return {
        type: 'DELETE_SOW',
        payload: request
    }
}

// Expects data to be an object
export function searchSOW(data, callback) {
    // Turn data into query param string
    // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object/1714899#1714899
    var qParam = Object.keys(data).map( k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
    const url = `${SOW}/search?${qParam}`;

    const request = axios.get(url, {
    }).then( (response) => {
        callback(response, data)});

    return {
        type: 'SEARCH_SOW',
        payload: request
    }
}