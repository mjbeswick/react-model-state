import { useState, useEffect } from 'react';
import TodoService from './todoService';

export const useTodos = () => {
    const [todos, setTodos] = useState(TodoService.getTodos());

    useEffect(() => {
        const unsubscribe = TodoService.onTodosUpdate(setTodos);

        return () => {
            unsubscribe();
        };
    }, []);

    return todos;
};
