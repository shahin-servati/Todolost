

function AppReducer(state , action){

switch (action.type) {
    case 'addtodo':
       return addtodo(state , action);
        break;  
        case 'delettodo' :
       return delettodo(state , action);

            break;
            case 'toggledone' : 
      return toggletodo(state , action);
    return state
}



let addtodo = (state , action) => {
    let {text} = action.payload
    return {
        ...state,

                    todos : [
                        ...state.todos,
                        { key : Date.now(), done : false , text}]
                }
}

let delettodo = (state , action) => {
    let {key} = action.payload
    return {
        ...state,
        todos : state.todos.filter( item => item.key !== key)
    }
}

let toggletodo = (state , action) => {
    let {key} = action.payload

            let item = state.todos.find(item => item.key === key);
item.done = ! item.done;
let newtodos = state.todos.filter(item => item.key !== key)
return {
    ...state,
    todos : [
        ... newtodos,
        item


    ]
}
}}

export default AppReducer;
