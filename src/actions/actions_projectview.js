import axios from 'axios';
import { PROJECTS } from '../api';

export function getDeliverablesByProject(id){
    return function(dispatch){
        return axios.get(`${PROJECTS}/${id}/deliverables`)
        .then((response) => {
            dispatch(setProjectDeliv(response.data));
        }).catch((error) => {
            console.log(error);
        });
    }

}

export const setProjectDeliv = (projectDeliverables) => {
    return{
        type: 'GET_PROJECT_DELIVERABLES',
        projectDeliverables
    }
}
