import _ from 'lodash';

export default function(state = {}, action){
    switch (action.type){
        case 'GET_DELIVERABLES':
            return _.mapKeys(action.deliverables, 'id');
        default:
            return state;
    }    
}