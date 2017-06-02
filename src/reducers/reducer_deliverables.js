import _ from 'lodash';

exports.defaultReducer = function(state = {}, action){
    switch (action.type){
        case 'GET_DELIVERABLES':
            return _.mapKeys(action.deliverables, 'id');
        case 'ADD_DELIVERABLE':
            console.log(action.deliverable);
            return {
                ...state,
                [action.deliverable.id]: {
                    ...action.deliverable
                }
            }
        default:
            return state;
    }    
}

exports.getDeliverableSuccess = function (state=[], action) {
    switch(action.type) {
        case 'GET_DELIVERABLE_SUCCESS':
            if (action.deliverable) {
                return action.deliverable;
            } else {
                return state;
            }
        default:
            return state;
    }
}

exports.getDeliverableHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'GET_DELIVERABLE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

exports.updateDeliverableSuccess = function (state=[], action) {
    switch(action.type) {
        case 'UPDATE_DELIVERABLE_SUCCESS':
            return action.changedRows;
        default:
            return state;
    }
}

exports.updateDeliverableHasErrored = function (state = false, action) {
    switch (action.type) {
        case 'UPDATE_DELIVERABLE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}