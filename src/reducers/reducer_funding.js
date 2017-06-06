export default function(state = [], action){
    switch (action.type){
        case 'ADD_FUNDING':
            return action;
        default:
            return state;
    }   
}