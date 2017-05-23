export default function(state = [], action){
    switch (action.type){
        case 'GET_EMPLOYEES':
            return action.employees;

        case 'SELECT_EMPLOYEE':
            return state.filter((employee) => {
                if(employee._id === action.employee_id)
                    return false;
                else
                    return true;
            });
        case 'GET_EMPLOYEES_BY_DISCIPLINE':
            return action.payload.data;
        default:
            return state;
    }   
}
