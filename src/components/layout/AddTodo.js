import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const AddTodo = () => {

    const [title, setTitle] = useState("");

    const add = useStoreActions(actions => actions.add);

    const onChange = (e) => setTitle(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        add({
            title,
            completed: false
        });
        setTitle('');
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex' }}>
            <input 
                type="text" 
                name="title" 
                placeholder="Add a new todo item..."  
                style={{ flex: '10', padding: '5px' }} 
                value={title}
                onChange={onChange}
                />
            <input 
                type="submit" 
                value="submit" 
                className="btn" 
                style={{ flex: '1' }} />
        </form>
    )
}

export default AddTodo
