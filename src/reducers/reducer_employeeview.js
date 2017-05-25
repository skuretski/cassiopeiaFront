export default function(state = null, action) {
    switch(action.type) {
        case 'GET_EMPLOYEEVIEWDATA':
            return action.employeeViewData;
        default:
            return state;
    }
}