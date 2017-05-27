import axios from 'axios';
import { ASSIGNMENTS } from '../../api';

export function createAssignment(data) {
    console.log('Data in action:', data);
    const request = axios.post(ASSIGNMENTS, {
        start_date: data.start_date,
        end_date: data.end_date,
        effort: data.effort,
        employee_id: data.employee_id,
        task_id: data.task_id
    });

    return {
        type: 'ADD_ASSIGNMENT',
        payload: request
    }
}