import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Todos() {

    const todosStore = useStoreState(state => state.todos);

    const fetchTodos = useStoreActions(actions => actions.fetchTodos);

    useEffect(() => {
        fetchTodos();
        // eslint-disable-next-line
    }, []);

    return todosStore.map( (todo) => (
        <TodoItem key={todo.id} todo={todo} />
    ) );
}
