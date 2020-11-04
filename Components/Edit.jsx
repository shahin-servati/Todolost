import React from 'react'
import { useState , useContext} from 'react';
import Todoscontext from './../Context/Todos.js'
import Editcontext from './../Context/Editcontext.js'



const Edittodo = (props) => {

const [text , settext] = useState(props.text)
////context/////

const editcontext = useContext(Editcontext)





let inputhandler = (e) => {
    settext(e.target.value)
}
    return(
<div className="col-6 mb-2">
        <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div>
                <input value = {text} onChange = {inputhandler}/>
           </div>
         <div>
    
               <button type="button" className="btn btn-info btn-sm mr-1" onClick ={() => editcontext.edit2(text)}>edit</button>                                                 
            </div>
        </div>                                   
          </div> 
    
    )
}

export default Edittodo;