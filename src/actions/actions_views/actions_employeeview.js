import axios from 'axios';
import { EMPLOYEEVIEW } from '../../api';

export function getEmployeeViewData(dispatch){
    return axios.get(EMPLOYEEVIEW)
    .then((response) => {
        dispatch(setEmployeeViewData(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export const setEmployeeViewData = (employeeViewData) => {
    return{
        type: 'GET_EMPLOYEEVIEWDATA',
        employeeViewData
    }
}

