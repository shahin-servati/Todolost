import React from 'react'
import {useReducer} from 'react'
import Header from './Header.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { FromAddTodo } from './FormAddTodo.jsx'


// const App = (props) => {
// //state
// const [stateForm , setStateForm] = useState({
// formInput : ''
// }
// )

// const[stateTodo , setStateTodo] =useState({
// todos : []
// })
// //////////////////////



// function formHandler(e){
// e.preventDefault()
// setStateTodo(prevState => {
// return {
// todos : [
// ...prevState.stateTodo.todos,
// { key : Date.now(), done : false , text : prevState.stateForm.formInput }]
// }

// })
// setStateForm({formInput : ''})

// }

// function inputHandler(e) {
// setStateForm({
// formInput : e.target.value
// })

// }

// return(
// <>
    // <div className="App">
        //
        <Header />
        // <main>
            // <section className="jumbotron">
                // <div className="container d-flex flex-column align-items-center">
                    // <h1 className="jumbotron-heading">Welcome!</h1>
                    // <p className="lead text-muted">To get started, add some items to your list:</p>


                    // <form className="form-inline" onSubmit={formHandler}>
                        // <div className="form-group">
                            // <input type="text" className="form-control mx-sm-3" placeholder="i want to do ..."
                                onChange={inputHandler} value={stateForm.formInput} />
                            // <button type='submit' className="btn btn-primary">add</button>
                            // </div>
                        // </form>



                    // </div>
                // </section>
            // <div className="todosList">
                // <div className="container">
                    // <div className="d-flex flex-column align-items-center ">
                        // <nav className="col-6 mb-3">
                            // <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                // <a className="nav-item nav-link active font-weight-bold" id="nav-home-tab">undone
                                    <span className="badge badge-secondary">9</span></a>
                                // <a className="nav-item nav-link font-weight-bold" id="nav-profile-tab">done <span
                                        className="badge badge-success">9</span></a>
                                // </div>
                            // </nav>
                        // <div className="col-6 mb-2">
                            // <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                // <div>
                                    // hello roocket
                                    // </div>
                                // <div>
                                    // <button type="button" className="btn btn-info btn-sm">edit</button>
                                    // <button type="button" className="btn btn-danger btn-sm ml-1">delete</button>
                                    // </div>
                                // </div>
                            // </div>
                        // <div className="col-6 mb-2">
                            // <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                // <div>
                                    // hello roocket
                                    // </div>
                                // <div>
                                    // <button type="button" className="btn btn-info btn-sm">edit</button>
                                    // <button type="button" className="btn btn-danger btn-sm ml-1">delete</button>
                                    // </div>
                                // </div>
                            // </div>
                        // <div className="col-6 mb-2">
                            // <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                // <div>
                                    // hello roocket
                                    // </div>
                                // <div>
                                    // <button type="button" className="btn btn-info btn-sm">edit</button>
                                    // <button type="button" className="btn btn-danger btn-sm ml-1">delete</button>
                                    // </div>
                                // </div>
                            // </div>
                        // </div>

                    // </div>
                // </div>
            // </main>
        // </div>
    // </>
// )

// }


// export default App;

import FormAddTodo from './FormAddTodo.jsx'
import Todo from './Todo.jsx'
import axios from 'axios'
///import context ///
import Todoscontext from './../Context/Todos.js'




export default class App extends React.Component{
state ={
todos : [],
statusDone : false,
loading : false,

}
/////////////////////////////////////////////////



addtodo (text, key) {
this.setState(prevState => {
return {
todos : [
...prevState.todos,
{ key , done : false , text}]
}

})

}

///////DELET TO DO////////

delettodo(id) {
///axios///
axios.delete(`https://react-shahin.firebaseio.com/todos/${id}.json`)
.then()
.catch(err => console.log(err))
/////
this.setState(prevState => {
return {
todos : prevState.todos.filter( item => item.key !== id)
}
})
}
////////DONE TO DO /////////

toggledone(key){
let item = this.state.todos.find(item => item.key === key);
item.done = ! item.done;
let newtodos = this.state.todos.filter(item => item.key !== key)
this.setState({
todos : [
... newtodos,
item
]
})
}
/////////EDIT TO DO ////////////

edittodo(key , text ) {

///axios////
axios.put(`https://react-shahin.firebaseio.com/todos/${key}.json`, { done : this.state.todos.done , text})
/////
let item = this.state.todos.find(item => item.key === key);
item.text = text;
let newtodos = this.state.todos.filter(item => item.key !== key)
this.setState({
todos : [
... newtodos,
item
]
})
}
///////////INIT TODO///////

jsonHandler(data){
this.setState({loading : false})
let todo = Object
.entries(data)
.map(([key , value]) =>
{
return {
...value,
key
}
})

this.setState(
{
todos : [
...todo
]
}
)
}

componentDidMount(){
///////
this.setState({loading : true})
axios.get(`https://react-shahin.firebaseio.com/todos.json`)
.then(response => console.log(this.jsonHandler(response.data)))
.catch(err => console.log(err))
///////
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
render(){

console.log(this.state.todos)
let filtertodos = this.state.todos.filter( item => item.done === this.state.statusDone)
return(
<>
    <Todoscontext.Provider value={{
        delete : this.delettodo.bind(this) ,
        done :this.toggledone.bind(this),
        edit : this.edittodo.bind(this),
        add : this.addtodo.bind(this)
             }}>

        <div className="App">
            <Header />
            <main>
                <section className="jumbotron">
                    <div className="container d-flex flex-column align-items-center">
                        <h1 className="jumbotron-heading">Welcome!</h1>
                        <p className="lead text-muted">To get started, add some items to your list:</p>


                        <FormAddTodo />


                    </div>
                </section>
                <div className="todosList">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center ">
                            {
                            this.state.loading
                            ?
                            <h2>LOADING ...</h2>
                            :
                            (<nav className="col-6 mb-3">
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">



                                    <a className={`nav-item nav-link font-weight-bold ${this.state.statusDone===false
                                        ? 'active' : '' }`} id="nav-home-tab" onClick={()=> this.setState({statusDone :
                                        false})}>

                                        undone

                                        <span className="badge badge-secondary">

                                            {this.state.todos.filter(item => item.done === false).length}

                                        </span>
                                    </a>



                                    <a className={`nav-item nav-link font-weight-bold ${this.state.statusDone===true
                                        ? 'active' : '' }`} id="nav-profile-tab" onClick={ ()=>
                                        this.setState({statusDone : true})
                                        }>
                                        done

                                        <span className="badge badge-success">

                                            {this.state.todos.filter(item => item.done === true).length}

                                        </span>

                                    </a>
                                </div>
                            </nav>)

                            }

                            {
                            filtertodos.length === 0 ?
                            <p></p> : filtertodos.map ( item =>
                            <Todo key={item.key} item={item} />)
                            }

                        </div>

                    </div>
                </div>
            </main>
        </div>

    </Todoscontext.Provider>

</>)

}




}