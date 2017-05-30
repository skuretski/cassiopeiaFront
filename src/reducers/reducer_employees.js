exports.createEmployeeHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'CREATE_EMPLOYEE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.createEmployeeIsSending = function (state = false, action) {
    switch (action.type) {
        case 'CREATE_EMPLOYEE_IS_SENDING':
            return action.isSending;
        default:
            return state;
    }
}

exports.createEmployeeSuccess = function (state = [], action) {
    switch (action.type) {
        case 'CREATE_EMPLOYEE_SUCCESS':
            return action.employee_id;
        default:
            return state;
    }
}

exports.getEmployeesByDiscipline = function (state = [], action) {
    switch (action.type) {
        case 'GET_EMPLOYEES_BY_DISCIPLINE':
            return action.payload.data
        default:
            return state;
    }
}