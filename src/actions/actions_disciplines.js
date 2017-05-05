import axios from 'axios';
import { DISCIPLINES } from '../api';

export function getDisciplines(dispatch){
    return axios.get(DISCIPLINES)
    .then((response) => {
        dispatch(setDisciplines(response.data));
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export const setDisciplines = (disciplines) => {
    return{
        type: 'GET_DISCIPLINES',
        disciplines
    }
}

export const setDiscipline = (discipline_id) => {
    return{
        type: 'SELECT_DISCIPLINE',
        discipline
    }
}