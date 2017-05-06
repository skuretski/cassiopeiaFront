export default function(state = [], action){
    switch (action.type){
        case 'GET_INDEXVIEWDATA':
            return action.indexViewData;
        default:
            return state;
    }   
}

