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

exports.updateEmployeeHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_EMPLOYEE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.updateEmployeeIsSending = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_EMPLOYEE_IS_SENDING':
            return action.isSending;
        default:
            return state;
    }
}

exports.updateEmployeeSuccess = function (state = [], action) {
    switch (action.type) {
        case 'UPDATE_EMPLOYEE_SUCCESS':
            return action.changedRows;
        default:
            return state;
    }
}

exports.deleteEmployeeHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'DELETE_EMPLOYEE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteEmployeeIsSending = function (state = false, action) {
    switch (action.type) {
        case 'DELETE_EMPLOYEE_IS_SENDING':
            return action.isSending;
        default:
            return state;
    }
}

exports.deleteEmployeeSuccess = function (state = [], action) {
    switch (action.type) {
        case 'DELETE_EMPLOYEE_SUCCESS':
            return action.affectedRows;
        default:
            return state;
    }
}

exports.getEmployeeHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'GET_EMPLOYEE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.getEmployeeIsSending = function (state = false, action) {
    switch (action.type) {
        case 'GET_EMPLOYEE_IS_SENDING':
            return action.isSending;
        default:
            return state;
    }
}

exports.getEmployeeSuccess = function (state = [], action) {
    switch (action.type) {
        case 'GET_EMPLOYEE_SUCCESS':
            if (action.employee) {
                return action.employee;
            } else {
                return state;
            }
        default:
            return state;
    }
}