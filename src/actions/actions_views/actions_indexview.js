import axios from 'axios';
import { INDEXVIEW } from '../../api';

export function getIndexViewData(dispatch){
    return axios.get(INDEXVIEW)
    .then((response) => {
        dispatch(setIndexViewData(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export const setIndexViewData = (indexViewData) => {
    return{
        type: 'GET_INDEXVIEWDATA',
        indexViewData
    }
}
