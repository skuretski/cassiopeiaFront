export default function(state = [], action){
    switch (action.type){
        case 'GET_PROJECTS':
            return action.projects;

        case 'SELECT_PROJECT':
            return state.filter((project) => {
                if(project._id === action.project_id)
                    return false;
                else
                    return true;
            });
        default:
            return state;
    }   
}

