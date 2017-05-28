import _ from 'lodash';

export default function(state = {}, action){
    switch (action.type){
        case 'GET_DELIVERABLES':
            return _.mapKeys(action.deliverables, 'id');
        case 'ADD_DELIVERABLE':
            console.log(action.deliverable);
            return {
                ...state,
                [action.deliverable.id]: {
                    ...action.deliverable
                }
            }
        default:
            return state;
    }    
}