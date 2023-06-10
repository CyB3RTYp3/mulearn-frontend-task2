import React, { useState, useEffect } from 'react';
import "./Todo.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Todo = ({ handleLogout }: TodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/todo/', {
        method: 'GET', 
      headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        
      });
      if (response.ok) {
        const todosData = await response.json();
        const todosWithId = todosData.map((todo: Todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }));
        setTodos(todosWithId);
      } else {
        throw new Error('Failed to fetch todos');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await fetch('https://mulearn-internship-task-production.up.railway.app/api/todo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });
      if (response.ok) {
        const createdTodo = await response.json();
        setTodos([...todos, createdTodo]);
        setNewTodo('');
      } else {
        throw new Error('Failed to create todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodoStatus = async (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const response = await fetch(`https://mulearn-internship-task-production.up.railway.app/api/todo/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        
      });
      if (!response.ok) {
        throw new Error('Failed to update todo status');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='todo'>
      <div className='image-todo'>
        <div className='header'>
          <h1 className='h1'>Todo-List</h1>
          <button className='logout' onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className='todo-div'>
          {selectedTodo ? (
            <>
              <input
                type='text'
                placeholder='Update Todo'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className='input-todo'
              />
            </>
          ) : (
            <>
              <input
                type='text'
                placeholder='New Todo'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className='input-todo'
              />
              <button onClick={createTodo} className='button-todo'>
                Add Todo
              </button>
            </>
          )}
        </div>
        <br />
        <br />
      </div>

      <ul className='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className='todo-label'>
              <input
                type='radio'
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
                className='radio-button'
              />
              <span className='checkmark'></span>
            </label>
            <span
              onClick={() => toggleTodoStatus(todo.id)}
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
            >
              {todo.title}
            </span>
            {!selectedTodo ? (
              <button
                onClick={() => setSelectedTodo(todo)}
                className='button-todo update-button'
              >
                Update
              </button>
            ) : (
              <button disabled className='button-todo update-button'>
                Update
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)} className='button-todo cancel-button'>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
