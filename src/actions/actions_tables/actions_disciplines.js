import axios from 'axios';
import { DISCIPLINES } from '../../api';

export function getDisciplines(dispatch){
    return axios.get(DISCIPLINES)
    .then((response) => {
        dispatch(setDisciplines(response.data));
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

export function createDiscipline(data) {
    return dispatch => {
        dispatch(createDisciplineHasErrored(false));
        return axios.post(DISCIPLINES, data)
        .then( response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(createDisciplineSuccess(response.data.insertId));
        }).catch( error => {
            dispatch(createDisciplineHasErrored(true));
            console.log(error);
        });
    };
}

export function createDisciplineHasErrored(bool) {
    return {
        type: 'CREATE_DISCIPLINE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function createDisciplineSuccess(discipline_id) {
    return {
        type: 'CREATE_DISCIPLINE_SUCCESS',
        discipline_id
    }
}

export function updateDiscipline(data) {
    return dispatch => {
        dispatch(updateDisciplineHasErrored(false));
        return axios.put(DISCIPLINES, data)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(updateDisciplineSuccess(response.data.changedRows));
            }).catch( error => {
                dispatch(createDisciplineHasErrored(true));
                console.log(error);
            });
    };
}

export function updateDisciplineHasErrored(bool) {
    return {
        type: 'UPDATE_DISCIPLINE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function updateDisciplineSuccess(changedRows) {
    return {
        type: 'UPDATE_DISCIPLINE_SUCCESS',
        changedRows
    }
}

export function deleteDiscipline(discipline_id) {
    return dispatch => {
        dispatch(deleteDisciplineHasErrored(false));
        const url = `${DISCIPLINES}/${discipline_id}`;
        return axios.delete(url)
            .then( response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(deleteDisciplineSuccess(response.data.affectedRows));
            }).catch( error => {
                dispatch(deleteDisciplineHasErrored(true));
                console.log(error);
            });
    };
}

export function deleteDisciplineHasErrored(bool) {
    return {
        type: 'DELETE_DISCIPLINE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function deleteDisciplineSuccess(affectedRows) {
    return {
        type: 'DELETE_DISCIPLINE_SUCCESS',
        affectedRows
    }
}
