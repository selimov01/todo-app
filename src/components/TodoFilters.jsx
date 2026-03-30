function TodoFilters({ filter, onFilterChange, activeCount, isDarkTheme }) {
    const filterStyles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '15px',
            paddingBottom: '15px',
            borderBottom: `2px solid ${isDarkTheme ? '#333' : '#eee'}`,
            backgroundColor: isDarkTheme ? '#2a2a2a' : 'transparent',
            borderRadius: '8px',
            color: isDarkTheme ? '#e0e0e0' : '#333',
            transition: 'all 0.3s ease'
        },
        button: (isActive) => ({
            margin: '0 5px',
            padding: '6px 12px',
            background: isActive
                ? '#007bff'
                : (isDarkTheme ? '#2a2a2a' : '#f0f0f0'),
            color: isActive
                ? 'white'
                : (isDarkTheme ? '#e0e0e0' : '#333'),
            border: `1px solid ${isDarkTheme ? '#444' : '#ddd'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            transition: 'all 0.3s ease'
        })
    };

    const getFilterLabel = (filterType) => {
        const labels = {
            'all': 'Все',
            'active': 'Активные',
            'completed': 'Выполненные'
        };
        return labels[filterType];
    };

    return (
        <div style={filterStyles.container}>
            <span>Осталось задач: {activeCount}</span>

            <div>
                {['all', 'active', 'completed'].map((filterType) => (
                    <button
                        key={filterType}
                        onClick={() => onFilterChange(filterType)}
                        style={filterStyles.button(filter === filterType)}
                        onMouseOver={(e) => {
                            if (filter !== filterType) {
                                e.target.style.background = isDarkTheme ? '#3a3a3a' : '#e0e0e0';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (filter !== filterType) {
                                e.target.style.background = isDarkTheme ? '#2a2a2a' : '#f0f0f0';
                            }
                        }}
                    >
                        {getFilterLabel(filterType)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoFilters;