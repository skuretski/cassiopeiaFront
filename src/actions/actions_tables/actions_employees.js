import axios from 'axios';
import { EMPLOYEES, EMPLOYEES_BY_DISCIPLINE, ONE_EMPLOYEE } from '../../api';

export function createEmployee(data) {
    return dispatch => {
        dispatch(createEmployeeHasErrored(false));
        dispatch(createEmployeeIsSending(true));
        return axios.post(EMPLOYEES, data)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(createEmployeeIsSending(false));
                dispatch(createEmployeeSuccess(response.data.insertId));
            }).catch( error => {
                dispatch(createEmployeeHasErrored(true));
                console.log(error);
            });
    };
}

export function createEmployeeIsSending(bool) {
    return {
        type: 'CREATE_EMPLOYEE_IS_SENDING',
        isSending: bool
    };
}

export function createEmployeeHasErrored(bool) {
    return {
        type: 'CREATE_EMPLOYEE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function createEmployeeSuccess(employee_id) {
    return {
        type: 'CREATE_EMPLOYEE_SUCCESS',
        employee_id
    }
}

export function getEmployeesByDiscipline(discipline_id) {
    const url = `${EMPLOYEES_BY_DISCIPLINE}/${discipline_id}`;
    const request = axios.get(url);
    return {
        type: 'GET_EMPLOYEES_BY_DISCIPLINE',
        payload: request
    };
}