import React from 'react';

// Too much passing of props
function App() {
  const [todos, setTodos] = React.useState([]);

  // toggle todo from todos
  function toggleTodo() {}

  return <TodoList todos={todos} toggleTodo={toggleTodo} />;
}

function TodoList({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} toggle={toggleTodo} />
      ))}
    </ul>
  );
}

// BETTER
function App() {
  const [todos, setTodos] = React.useState([]);

  // toggle todo from todos
  function toggleTodo() {}

  return (
    <TodoList>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </TodoList>
  );
}

function TodoList({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

function Todo({ todo, toggleTodo }) {
  return (
    <li>
      <input
        type='checkbox'
        id={todo.id}
        onChange={toggleTodo}
        checked={todo.checked}
      />
      <label for={todo.id}>Scales</label>
    </li>
  );
}
