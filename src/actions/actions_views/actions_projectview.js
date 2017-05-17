import axios from 'axios';
import { PROJECTVIEW } from '../../api';

export function getProjectViewData(id){
    return function(dispatch){
        return axios.get(`${PROJECTVIEW}/${id}`)
        .then((response) => {
            dispatch(setProjectViewData(response.data));
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const setProjectViewData = (projectViewData) => {
    return{
        type: 'GET_PROJECTVIEWDATA',
        projectViewData
    }
}

