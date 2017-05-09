export default function(state = {}, action){
    switch (action.type){
        case 'GET_PROJECT_DELIVERABLES':
            return _.mapKeys(action.projectDeliverables, 'id');   
        default:
            return state;
    }   
}
