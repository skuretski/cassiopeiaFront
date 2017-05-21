import axios from 'axios';
import { FUNDINGVIEW } from '../../api';

export function getFundingViewData(dispatch){
    return axios.get(`${FUNDINGVIEW}`)
    .then((response) => {
        dispatch(setFundingViewData(response.data));
    }).catch((error) => {
        console.log(error);
    });
}

export const setFundingViewData = (fundingViewData) => {
    return{
        type: 'GET_FUNDINGVIEWDATA',
        fundingViewData
    }
}

