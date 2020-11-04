import React from 'react'
import { useState,useContext } from 'react'
import Todoscontext from '../Context/Todos.js'
import axios from 'axios'


 const FormAddTodo = (props) => {

    const [setForm , setStateForm] = useState('')

    ///context////
const todoscontext = useContext(Todoscontext)

////////////////////////////////////////////////////////////////////////////////

    function formHandler(e){
        e.preventDefault()

        if(setForm === ''){
          alert('please fill the form')
        }else {

        //axios
        let todo = {text : setForm , done : false}
axios.post(`https://react-shahin.firebaseio.com/todos.json`, todo)
.then(response =>  todoscontext.add(setForm , response.data.name))
.catch(err => console.log(err))
        ////
     
       setStateForm('')   
     } 
    }
    ///////////// 
      function inputHandler(e) {
        setStateForm( e.target.value)
        
     }
    /////////////////////////////////////////////////////////////////////////////

    return(
<form className="form-inline" onSubmit={formHandler}>
                        <div className="form-group">
                                 <input type="text" className="form-control mx-sm-3" placeholder="i want to do ..."  onChange={inputHandler} value={setForm}/>
                                 <button type ='submit' className="btn btn-primary" >add</button>
                            </div>
                           </form>

    )
}

export default FormAddTodo;