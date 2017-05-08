export default function(state = [], action){
    switch (action.type){
        case 'GET_PROJECTS':
            return action.projects;

        case 'SELECT_PROJECT':
            console.log(state);
            return {
                selectedProject: action.project
            }
        
        default:
            return state;
    }   
}

