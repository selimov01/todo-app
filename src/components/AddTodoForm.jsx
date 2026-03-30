import { useState } from 'react';

function AddTodoForm({ onAdd, isDarkTheme }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    const formStyles = {
        form: {
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: isDarkTheme ? '#2a2a2a' : 'transparent',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
        },
        input: {
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '4px',
            border: `1px solid ${isDarkTheme ? '#444' : '#ddd'}`,
            backgroundColor: isDarkTheme ? '#2a2a2a' : '#fff',
            color: isDarkTheme ? '#e0e0e0' : '#333',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        button: {
            padding: '10px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background 0.3s ease'
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.form}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Добавить новую задачу..."
                style={formStyles.input}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = isDarkTheme ? '#444' : '#ddd'}
            />
            <button
                type="submit"
                style={formStyles.button}
                onMouseOver={(e) => e.target.style.background = '#45a049'}
                onMouseOut={(e) => e.target.style.background = '#4CAF50'}
            >
                Добавить
            </button>
        </form>
    );
}

export default AddTodoForm;