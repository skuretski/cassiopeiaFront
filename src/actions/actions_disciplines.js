import axios from 'axios';
import { DISCIPLINES } from '../api';

export function getDisciplines(){
    const response = axios.get(DISCIPLINES);
    return {
        type: 'GET_DISCIPLINES',
        payload: response
    };
}