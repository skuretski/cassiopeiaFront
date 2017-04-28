import axios from 'axios';
import { PROJECTS } from '../api';

export function getProjects(){
    const response = axios.get(PROJECTS);
    return {
        type: 'GET_PROJECTS',
        payload: response
    };
}

