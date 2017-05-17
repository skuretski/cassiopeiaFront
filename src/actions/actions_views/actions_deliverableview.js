import axios from 'axios';
import { DELIVERABLEVIEW } from '../../api';

export function getDeliverableViewData(id) {
    return function(dispatch){
        return axios.get(`${DELIVERABLEVIEW}/${id}`)
        .then((response) => {
            dispatch(setDeliverableViewData(response.data));
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const setDeliverableViewData = (deliverableViewData) => {
    return {
        type: 'GET_DELIVERABLEVIEWDATA',
        deliverableViewData
    }
}