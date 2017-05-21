export default function(state = {}, action) {
    switch(action.type) {
        case 'GET_FUNDINGVIEWDATA':
            return action.fundingViewData;
        default:
            return state;
    }
}