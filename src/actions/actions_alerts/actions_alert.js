exports.addAlert = (text) => {
    return {
        type: 'ADD_ALERT',
        text
    }
}

exports.deleteAlert = (id) => {
    return{
        type: 'REMOVE_ALERT',
        id
    }
} 