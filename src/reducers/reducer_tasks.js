export default function(state = [], action){
    switch (action.type){
        case 'GET_TASKS':
            return action.tasks;

        default:
            return state;
    }    
}