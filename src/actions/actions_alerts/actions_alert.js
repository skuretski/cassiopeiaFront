export function addAlert(text){
    return {
        type: 'ADD_ALERT',
        text
    }
}

export function deleteAlert(id){
    return{
        type: 'DELETE_ALERT',
        id
    }
} 

export function removeAllAlerts(){
    return{
        type: 'REMOVE_ALL'
    }
}