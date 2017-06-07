exports.defaultReducer = function(state = {}, action){
    switch (action.type){
        case 'GET_TASKS':
            return _.mapKeys(action.tasks, 'id');  
        case 'ADD_TASK':
            return{
                ...state,
                [action.task.id]:{
                    ...action.task
                }
            }
        default:
            return state;
    }    
}

exports.getTaskSuccess = function (state=[], action) {
    switch(action.type) {
        case 'GET_TASK_SUCCESS':
            if (action.task) {
                return action.task;
            } else {
                return state;
            }
        default:
            return state;
    }
}

exports.getTaskHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'GET_TASK_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.updateTaskSuccess = function (state=[], action) {
    switch(action.type) {
        case 'UPDATE_TASK_SUCCESS':
            return action.changedRows;
        default:
            return state;
    }
}

exports.updateTaskHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_TASK_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteTaskHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'DELETE_TASK_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteTaskSuccess = function (state = [], action) {
    switch (action.type) {
        case 'DELETE_TASK_SUCCESS':
            return action.affectedRows;
        default:
            return state;
    }
}
