import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit, isDarkTheme }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const itemStyles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            borderBottom: `1px solid ${isDarkTheme ? '#333' : '#eee'}`,
            backgroundColor: isDarkTheme ? '#2a2a2a' : '#fff',
            transition: 'background-color 0.3s ease'
        },
        text: {
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed
                ? (isDarkTheme ? '#666' : '#999')
                : (isDarkTheme ? '#e0e0e0' : '#333'),
            cursor: 'pointer',
            userSelect: 'none'
        },
        editInput: {
            flex: 1,
            padding: '6px 10px',
            border: `2px solid ${isDarkTheme ? '#4CAF50' : '#007bff'}`,
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: isDarkTheme ? '#1a1a1a' : '#fff',
            color: isDarkTheme ? '#e0e0e0' : '#333',
            outline: 'none'
        },
        deleteButton: {
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'background 0.3s ease'
        },
        saveButton: {
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            marginRight: '5px',
            transition: 'background 0.3s ease'
        },
        cancelButton: {
            background: '#999',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'background 0.3s ease'
        },
        checkbox: {
            width: '18px',
            height: '18px',
            cursor: 'pointer'
        }
    };

    return (
        <li style={itemStyles.container}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                style={itemStyles.checkbox}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={itemStyles.editInput}
                        autoFocus
                    />
                    <button
                        onClick={handleSave}
                        style={itemStyles.saveButton}
                        onMouseOver={(e) => e.target.style.background = '#45a049'}
                        onMouseOut={(e) => e.target.style.background = '#4CAF50'}
                    >
                        ✓
                    </button>
                    <button
                        onClick={handleCancel}
                        style={itemStyles.cancelButton}
                        onMouseOver={(e) => e.target.style.background = '#777'}
                        onMouseOut={(e) => e.target.style.background = '#999'}
                    >
                        ✕
                    </button>
                </>
            ) : (
                <>
          <span
              style={itemStyles.text}
              onDoubleClick={handleDoubleClick}
              title="Двойной клик для редактирования"
          >
            {task.text}
          </span>
                    <button
                        onClick={() => onDelete(task.id)}
                        style={itemStyles.deleteButton}
                        onMouseOver={(e) => e.target.style.background = '#cc0000'}
                        onMouseOut={(e) => e.target.style.background = '#ff4444'}
                    >
                        Удалить
                    </button>
                </>
            )}
        </li>
    );
}

export default TodoItem;