import _ from 'lodash';

exports.defaultReducer = function(state = {}, action){
    switch (action.type){   
        case 'GET_PROJECTS':
            return _.mapKeys(action.projects, 'id'); 
        case 'ADD_PROJECT':
            return {
                ...state,
                [action.project.id]: {
                    ...action.project
                }
            }
        default:
            return state;
    }   
}

exports.getProjectSuccess = function (state=[], action) {
    switch(action.type) {
        case 'GET_PROJECT_SUCCESS':
            if (action.project) {
                return action.project;
            } else {
                return state;
            }
        default:
            return state;
    }
}

exports.getProjectHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'GET_PROJECT_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.updateProjectSuccess = function (state=[], action) {
    switch(action.type) {
        case 'UPDATE_PROJECT_SUCCESS':
            return action.changedRows;
        default:
            return state;
    }
}

exports.updateProjectHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_PROJECT_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteProjectHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'DELETE_PROJECT_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteProjectSuccess = function (state = [], action) {
    switch (action.type) {
        case 'DELETE_PROJECT_SUCCESS':
            return action.affectedRows;
        default:
            return state;
    }
}


