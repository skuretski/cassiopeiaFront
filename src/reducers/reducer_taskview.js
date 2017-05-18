export default function(state = {}, action) {
    switch(action.type) {
        case 'GET_TASKVIEWDATA':
            return action.taskViewData;
        default:
            return state;
    }
}