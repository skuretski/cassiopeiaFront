export default function(state = [], action){
    switch (action.type){
        case 'ADD_ASSIGNMENT':
            console.log('Action in reducer:', action);
            return action;
        default:
            return state;
    }   
}