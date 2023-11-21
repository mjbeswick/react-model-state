import { useState, useEffect } from 'react';
import TodoService from './todoService';

export const useTodos = () => {
    const [todos, setTodos] = useState(TodoService.getTodos());

    useEffect(() => {
        return TodoService.onTodosUpdate(setTodos);
    }, []);

    return todos;
};
