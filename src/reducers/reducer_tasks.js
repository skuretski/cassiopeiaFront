export default function(state = {}, action){
    switch (action.type){
        case 'GET_TASKS':
            return _.mapKeys(action.tasks, 'id');  

        default:
            return state;
    }    
}