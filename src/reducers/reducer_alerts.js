import uuid from 'uuid';

const initialState = [];
export default function(state = initialState, action){
    switch(action.type){
        case 'ADD_ALERT':
            return [
                ...state,
                {
                    text: action.text,
                    id: uuid.v4()
                }
            ]
        case 'DELETE_ALERT':
            return state.filter((alert) => {
                if(alert.id === action.id)
                    return false;
                else
                    return true;
            });
        default:
            return state;   
    }
}