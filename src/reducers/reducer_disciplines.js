import _ from 'lodash';

exports.getDisciplines = function(state = [], action){
    switch (action.type){
        case 'GET_DISCIPLINES':
            return action.disciplines;
        default:
            return state;
    }    
}

exports.createDisciplineHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'CREATE_DISCIPLINE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.createDisciplineSuccess = function (state = [], action) {
    switch (action.type) {
        case 'CREATE_DISCIPLINE_SUCCESS':
            return action.discipline_id;
        default:
            return state;
    }
}

exports.updateDisciplineHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_DISCIPLINE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.updateDisciplineSuccess = function (state = [], action) {
    switch (action.type) {
        case 'UPDATE_DISCIPLINE_SUCCESS':
            return action.changedRows;
        default:
            return state;
    }
}

exports.deleteDisciplineHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'DELETE_DISCIPLINE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.deleteDisciplineSuccess = function (state = [], action) {
    switch (action.type) {
        case 'DELETE_DISCIPLINE_SUCCESS':
            return action.affectedRows;
        default:
            return state;
    }
}
