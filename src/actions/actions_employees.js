import axios from 'axios';
import { EMPLOYEES, ONE_EMPLOYEE } from '../api';

export function postEmployees(data){
    const response = axios.post(EMPLOYEES, {
        first: data.first,
        last: data.last,
        discipline_id: data.discipline_id
    });
    return {
        type: 'POST_EMPLOYEES',
        payload: response
    };
}