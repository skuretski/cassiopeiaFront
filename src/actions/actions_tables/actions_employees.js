import axios from 'axios';
import { EMPLOYEES, ONE_EMPLOYEE } from '../../api';

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