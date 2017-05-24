import _ from 'lodash';

export default function(state = {}, action){
    switch (action.type){   
        case 'GET_PROJECTS':
            return _.mapKeys(action.projects, 'id'); 
        case 'ADD_PROJECT':
            return {
                ...state,
                [action.project.id]: {
                    ...action.project
                }
            }
        default:
            return state;
    }   
}


