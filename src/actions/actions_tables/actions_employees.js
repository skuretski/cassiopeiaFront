import axios from 'axios';
import { EMPLOYEES, EMPLOYEES_BY_DISCIPLINE, ONE_EMPLOYEE } from '../../api';

export function postEmployees(data){
    return axios.post(EMPLOYEES, {
        first: data.first,
        last: data.last,
        discipline_id: data.discipline_id
    }).then((response) => {
        dispatch(createEmployee(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export function getEmployees(dispatch){
    return axios.get(EMPLOYEES)
    .then((response) => {
        dispatch(setEmployees(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

var createEmployee = (newEmployee) => {
    return {
        type: 'ADD_EMPLOYEE',
        employee: newEmployee.data
    }
}

export var setEmployees = (employees) => {
    return {
        type: 'GET_EMPLOYEES',
        employees
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