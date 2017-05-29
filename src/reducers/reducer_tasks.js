export default function(state = {}, action){
    switch (action.type){
        case 'GET_TASKS':
            return _.mapKeys(action.tasks, 'id');  
        case 'ADD_TASK':
            console.log(action.task);
            return{
                ...state,
                [action.task.id]:{
                    ...action.task
                }
            }
        default:
            return state;
    }    
}