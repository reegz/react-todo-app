import React from 'react';
import { useStoreActions } from 'easy-peasy';

const getStyle = (todo) => {
    return {
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        textDecoration: todo.completed ? 'line-through' : 'none'
    }
}

const TodoItem = ( { todo } ) => {

        const { id, title } = todo;

        const { remove, toggle }  = useStoreActions(actions => ({
            remove: actions.remove,
            toggle: actions.toggle,
        }));

        const style=getStyle(todo);

        return (
            <div style={style} >
                <p>
                    <span onClick={() => toggle(id)} style={{ cursor: "pointer" }}> {' '}
                    { title }
                    </span>
                    <button style={btnStyle} onClick={() => remove(id)}>
                        <i className="fas fa-trash-alt" />x
                    </button>
                </p>
            </div>
        )
}

export default TodoItem;

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}
