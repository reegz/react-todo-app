import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreProvider, createStore } from 'easy-peasy';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Todos';
import Todos from './components/Todos';
import AddTodo from './components/layout/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
// import uuid from 'uuid';
import model from './model';

class App extends Component  {

  store = createStore(model);

  state = {
    todos: [
      // { id: uuid.v4(), title: 'Learn React', completed: false },
      // { id: uuid.v4(), title: 'Learn Redux', completed: false },
      // { id: uuid.v4(), title: 'Learn React Router', completed: true }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState( { todos: res.data }) )
  }
  
  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    )

    // this.setState({
    //   todos: [...this.state.todos.filter(todo => todo.id !== id)]
    // });
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }

    axios.post('https://jsonplaceholder.typicode.com/todos', 
      { title, completed: false} )
    .then(res => 
      this.setState( {
        todos: [...this.state.todos, res.data]
      }) 
    );

    // this.setState({
    //   todos: [...this.state.todos, newTodo]
    // });
  }

  render() {
    return (
      <StoreProvider store={this.store} >
        <Router>
          <div className="App">
            <div className="container">
              <Header/>
              <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo} />
                </React.Fragment>
              )} 
              />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router>
      </StoreProvider>
    );
  }
}

export default App;
