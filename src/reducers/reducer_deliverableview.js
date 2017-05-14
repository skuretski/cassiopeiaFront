export default function(state = {}, action) {
    switch(action.type) {
        case 'GET_DELIVERABLEVIEWDATA':
            return action.deliverableViewData;
        default:
            return state;
    }
}