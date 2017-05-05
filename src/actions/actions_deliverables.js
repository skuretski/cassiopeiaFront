import axios from 'axios';
import { DELIVERABLES } from '../api';

export function getDeliverables(){
    const response = axios.get(DELIVERABLES);
    return {
        type: 'GET_DELIVERABLES',
        payload: response
    };
}