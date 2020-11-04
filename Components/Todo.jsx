import React from 'react'
import { useState , useContext} from 'react'
import Edittodo from './Edit.jsx'
import Todoscontext from './../Context/Todos.js'
import Editcontext from './../Context/Editcontext'
import Axios from 'axios'


const Todo = (props) => {



const [edit , setedit] = useState(false)
//////context/////
const todoscontext = useContext(Todoscontext)

//////edithandler/////
let edithandler = (text) => {
todoscontext.edit(props.item.key,text)
setedit(false)
}
////////DONE UNDONE//////
let doneHandler = () => {
///axios///
Axios.put(`https://react-shahin.firebaseio.com/todos/${props.item.key}.json`,{done : ! props.item.done , text :
props.item.text})
///////
todoscontext.done(props.item.key)
}


return(
<>
    <Editcontext.Provider value={{
            edit2 : edithandler,
        }}>
        {
        edit === false ?

        (

        <div className="col-6 mb-2">
            <div className="d-flex justify-content-between align-items-center border rounded p-3">
                <div>
                    {props.item.text}
                </div>
                <div>
                    <button type="button" className={`btn btn-sm mr-1 ${props.item.done ? 'btn-warning' : 'btn-success'
                        }`} onClick={doneHandler}>{props.item.done ? 'undone': 'done'}</button>
                    <button type="button" className="btn btn-info btn-sm mr-1" onClick={()=>
                        setedit(true)}>edit</button>
                    <button type="button" className="btn btn-danger btn-sm ml-1" onClick={()=>
                        todoscontext.delete(props.item.key)}>delete</button>
                </div>
            </div>
        </div>

        )

        :
        <Edittodo text={props.item.text} />


        }


    </Editcontext.Provider>
</>

)
}

export default Todo;