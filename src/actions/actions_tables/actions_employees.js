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

export function updateEmployee(data) {
    return dispatch => {
        dispatch(updateEmployeeHasErrored(false));
        dispatch(updateEmployeeIsSending(true));
        return axios.put(EMPLOYEES, data)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(updateEmployeeIsSending(false));
                dispatch(updateEmployeeSuccess(response.data.changedRows));
            }).catch( error => {
                dispatch(createEmployeeHasErrored(true));
                console.log(error);
            });
    };
}

export function deleteEmployee(employee_id) {
    return dispatch => {
        dispatch(deleteEmployeeHasErrored(false));
        dispatch(deleteEmployeeIsSending(true));
        const url = `${EMPLOYEES}/${employee_id}`;
        return axios.delete(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(deleteEmployeeIsSending(false));
                dispatch(deleteEmployeeSuccess(response.data.affectedRows));
            }).catch( error => {
                dispatch(deleteEmployeeHasErrored(true));
                console.log(error);
            });
    };
}

export function getEmployeeById(employee_id) {
    return dispatch => {
        dispatch(getEmployeeHasErrored(false));
        dispatch(getEmployeeIsSending(true));
        const url = `${EMPLOYEES}/${employee_id}`;
        return axios.get(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(getEmployeeIsSending(false));
                dispatch(getEmployeeSuccess(response.data[0]));
            }).catch( error => {
                dispatch(getEmployeeHasErrored(true));
                console.log(error);
            });
    };
}

export function getEmployeesByDiscipline(discipline_id) {
    return dispatch => {
        dispatch(getEmployeeHasErrored(false));
        dispatch(getEmployeeIsSending(true));
        const url = `${EMPLOYEES_BY_DISCIPLINE}/${discipline_id}`;
        return axios.get(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(getEmployeeIsSending(false));
                dispatch(getEmployeeSuccess(response.data));
            }).catch( error => {
                dispatch(getEmployeeHasErrored(true));
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

export function updateEmployeeIsSending(bool) {
    return {
        type: 'UPDATE_EMPLOYEE_IS_SENDING',
        isSending: bool
    };
}

export function updateEmployeeHasErrored(bool) {
    return {
        type: 'UPDATE_EMPLOYEE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function updateEmployeeSuccess(changedRows) {
    return {
        type: 'UPDATE_EMPLOYEE_SUCCESS',
        changedRows
    }
}

export function deleteEmployeeIsSending(bool) {
    return {
        type: 'DELETE_EMPLOYEE_IS_SENDING',
        isSending: bool
    };
}

export function deleteEmployeeHasErrored(bool) {
    return {
        type: 'DELETE_EMPLOYEE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function deleteEmployeeSuccess(affectedRows) {
    return {
        type: 'DELETE_EMPLOYEE_SUCCESS',
        affectedRows
    }
}

export function getEmployeeIsSending(bool) {
    return {
        type: 'GET_EMPLOYEE_IS_SENDING',
        isSending: bool
    };
}

export function getEmployeeHasErrored(bool) {
    return {
        type: 'GET_EMPLOYEE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function getEmployeeSuccess(employee) {
    return {
        type: 'GET_EMPLOYEE_SUCCESS',
        employee
    }
}
