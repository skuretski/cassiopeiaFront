export default function(state = [], action){
    switch (action.type){
        case 'ADD_ASSIGNMENT':
            return action;
        default:
            return state;
    }   
}