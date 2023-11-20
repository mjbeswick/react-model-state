import Emittery from 'emittery';
import { useEffect, useState } from 'react';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

class TodoService {
    private todos: TodoItem[] = [];
    private emitter = new Emittery();
    private lastId = 0;

    public getTodos() {
        return this.todos;
    }

    public addTodo(text: string) {
        const newTodo: TodoItem = { id: ++this.lastId, text, completed: false };
        this.todos = [...this.todos, newTodo];
        this.emitter.emit('update', this.todos);
    }

    public toggleTodoCompletion(id: number) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.emitter.emit('update', this.todos);
    }

    public onTodosUpdate(listener: (todos: TodoItem[]) => void) {
        return this.emitter.on('update', listener);
    }
}

export default new TodoService();