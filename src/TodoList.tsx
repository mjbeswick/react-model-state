import TodoService from './todoService';
import { useInput } from './useInput';
import { useTodos } from './useTodos';

const TodoList: React.FC = () => {
    const nameField = useInput('');
    const todos = useTodos();

    const handleAddTodo = () => {
        if (nameField.value) {
            TodoService.addTodo(nameField.value);
        }
    };

    const handleToggle = (id: number) => {
        TodoService.toggleTodoCompletion(id);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
                margin: '10px 0'
            }}>
                <input
                    type="text"
                    {...nameField.props}
                    required
                    placeholder="Add something..."
                />
                <button
                    onClick={handleAddTodo}
                    disabled={!nameField.value}
                >
                    Add
                </button>
            </div>
            <ul style={{
                margin: '10px 0',
                padding: '0 0 0 20px',
            }}>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'lightgrey' : 'black',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleToggle(todo.id)}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
