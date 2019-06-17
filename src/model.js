import { action, thunk } from 'easy-peasy';
import uuid from 'uuid';

export default {
    todos: [
        // { id: 333, title: 'Learn React', completed: false },
        // { id: 343, title: 'Learn Redux', completed: false },
        // { id: 345, title: 'Learn React Router', completed: true }
      ],

      // Thunk
      fetchTodos: thunk(async actions => {
          const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
          const todos = await res.json();
          actions.setTodos(todos);
      }),

      // Actions
      toggle: action( (state, id) => {
          state.todos.map(todo => {
              if (todo.id === id) {
                  todo.completed = !todo.completed;
              }
              return todo;
          });
      }),
      
      remove: action( (state, id) => {
        state.todos = state.todos.filter(todo => todo.id !== id);
      }),

      add: action( (state, todo) => {
          todo.id = uuid.v4();
          state.todos = [...state.todos, todo];
      }),
      
      setTodos: action( (state, todos) => {
          state.todos = todos;
      })

};