export default function(state = [], action){
    switch (action.type){
        case 'GET_DISCIPLINES':
            return action.disciplines;

        case 'SELECT_DISCIPLINE':
            return state.filter((discipline) => {
                if(discipline._id === action.discipline_id)
                    return false;
                else
                    return true;
            });
        default:
            return state;
    }    
}