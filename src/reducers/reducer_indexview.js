export default function(state = null, action){
    switch (action.type){
        case 'GET_INDEXVIEWDATA':
            return action.indexViewData;
        default:
            return state;
    }   
}

