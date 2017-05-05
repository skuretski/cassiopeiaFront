export default function(state = [], action){
    switch (action.type){
        case 'GET_DELIVERABLES':
            return action.deliverables;

        case 'SELECT_DELIVERABLE':
            return state.filter((deliverable) => {
                if(deliverable._id === action.deliverable_id)
                    return false;
                else
                    return true;
            });
        default:
            return state;
    }    
}