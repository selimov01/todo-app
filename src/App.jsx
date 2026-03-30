import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
    // Состояние для списка задач
    const [todos, setTodos] = useState(() => {
        // Загружаем сохраненные задачи из localStorage
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    // Состояние для текущего фильтра
    const [filter, setFilter] = useState('all');

    // Состояние для темы (новое)
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Сохраняем задачи в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Сохраняем тему в localStorage и применяем к body
    useEffect(() => {
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        // Применяем тему к body
        document.body.style.backgroundColor = isDarkTheme ? '#1a1a1a' : '#ffffff';
        document.body.style.transition = 'background-color 0.3s ease';
    }, [isDarkTheme]);

    // Добавление новой задачи
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    // Переключение статуса задачи
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Удаление задачи
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Редактирование задачи (новое)
    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    // Переключение темы (новое)
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    // Фильтрация задач
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // 'all'
    });

    // Подсчет активных задач
    const activeCount = todos.filter(todo => !todo.completed).length;

    // Стили для темной темы
    const themeStyles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
            transition: 'all 0.3s ease'
        },
        header: {
            textAlign: 'center',
            color: isDarkTheme ? '#ffffff' : '#333',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        title: {
            flex: 1,
            color: isDarkTheme ? '#ffffff' : '#333'
        },
        themeButton: {
            padding: '8px 16px',
            background: isDarkTheme ? '#4CAF50' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background 0.3s ease'
        },
        emptyText: {
            textAlign: 'center',
            color: isDarkTheme ? '#999' : '#666'
        }
    };

    return (
        <div style={themeStyles.container}>
            <div style={themeStyles.header}>
                <h1 style={themeStyles.title}>Менеджер задач</h1>
                <button
                    onClick={toggleTheme}
                    style={themeStyles.themeButton}
                    onMouseOver={(e) => e.target.style.opacity = '0.8'}
                    onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                    {isDarkTheme ? ' Светлая тема' : ' Темная тема'}
                </button>
            </div>

            <AddTodoForm onAdd={addTodo} isDarkTheme={isDarkTheme} />

            <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                isDarkTheme={isDarkTheme}
            />

            {filteredTodos.length === 0 ? (
                <p style={themeStyles.emptyText}>
                    {filter === 'all' ? 'Задач пока нет' :
                        filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
                </p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            task={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                            isDarkTheme={isDarkTheme}
                        />
                    ))}
                </ul>
            )}

            {todos.length > 0 && (
                <button
                    onClick={() => setTodos([])}
                    style={{
                        marginTop: '20px',
                        padding: '8px 16px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#c82333'}
                    onMouseOut={(e) => e.target.style.background = '#dc3545'}
                >
                    Очистить всё
                </button>
            )}
        </div>
    );
}

export default App;