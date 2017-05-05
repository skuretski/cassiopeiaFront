export default function(state = [], action){
    switch (action.type){
        case 'GET_TASKS':
            return action.tasks;

        case 'SELECT_TASK':
            return state.filter((task) => {
                if(task._id === action.task_id)
                    return false;
                else
                    return true;
            });
        default:
            return state;
    }    
}