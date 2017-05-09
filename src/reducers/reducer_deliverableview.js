export default function(state = {}, action){
    switch (action.type){
        case 'GET_DELIVERABLE_TASKS':
            return _.mapKeys(action.deliverableTasks, 'id');   
        default:
            return state;
    }   
}
