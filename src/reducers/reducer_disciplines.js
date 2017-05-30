import _ from 'lodash';

export default function(state = [], action){
    switch (action.type){
        case 'GET_DISCIPLINES':
            return action.disciplines;
        default:
            return state;
    }    
}
