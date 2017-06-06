export function addAlert(text){
    console.log(text);
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