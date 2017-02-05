import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm,TodoList,Footer} from './components/todo';
import { addTodo,generateId,findById,toggleTodo,updateTodo,removeTodo,filterTodos } from './lib/todoHelpers';
import {pipe,partial} from "./lib/utils"
import { loadTodos,createTodo,saveTodo,destroyTodo } from './lib/todoService'
class App extends Component {
 static contextTypes = {
      route : React.PropTypes.string
    }

state = {
       todos:[],
       currentTodo:''
    }

componentDidMount() {
  loadTodos()
  .then(todos => this.setState({todos}))
}
   
handleRemove = (id,evt) => {
  evt.preventDefault()
  const updatedTodos = removeTodo(this.state.todos,id);
  this.setState({todos:updatedTodos})
  destroyTodo(id)
    .then(() => this.showTempMessage("Delete Todo"));
}


handleToggle = (id) => {
  console.log('id...'+ id);
  const getToggleTodo = pipe(findById,toggleTodo)
  const updated = getToggleTodo(id,this.state.todos)
   console.log('updated...'+ JSON.stringify(updated));
  const getUpdatedTodos = partial(updateTodo,this.state.todos)
  console.log('getUpdatedTodos...'+ JSON.stringify(getUpdatedTodos));
  const updatedTodos = getUpdatedTodos(updated)
     console.log('updatedTodos...'+ JSON.stringify(updatedTodos));
  this.setState({todos:updatedTodos})
   saveTodo(updated)
    .then(() => this.showTempMessage('Todo Updated'))
} 

handleInputChange = (evt)=>{
  this.setState({
    currentTodo: evt.target.value
  })
}
handleSubmit = (evt) => {
  evt.preventDefault()
  const newId = generateId()
  const newTodo = {id:newId,name: this.state.currentTodo, isComplete:false}
  console.log('newTodo..'+ JSON.stringify(newTodo));
  const updateTodos = addTodo(this.state.todos,newTodo)
  this.setState({
    todos: updateTodos,
    currentTodo: '',
    errorMessage: ''
  })
  createTodo(newTodo)
   .then(() => this.showTempMessage('Todo Added'))
}

showTempMessage = (msg) => {
  this.setState({message:msg})
  setTimeout(() => this.setState({message: ''}), 2500)
}

handleEmptySubmit = (evt) => {
  evt.preventDefault()
  this.setState({
    errorMessage:'Please supply a todo name'
  })
}

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit:this.handleEmptySubmit;
    const displayTodos  = filterTodos(this.state.todos,this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-app">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage} </span> }
        {this.state.message && <span className="success">{this.state.message} </span> }
        <TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} 
        handleSubmit={submitHandler} />
        <TodoList handleToggle={this.handleToggle} 
        todos={displayTodos}
        handleRemove={this.handleRemove}
        />
         <Footer />
       
        </div>
        
      </div>
    );
  }
}

export default App;
