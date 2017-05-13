// if you don't get me state, set state = null
export default function(state = {}, action){
    switch (action.type){
        case 'GET_PROJECTVIEWDATA':
            return action.projectViewData;
        default:
            return state;
    }   
}