import React from 'react';

// NO SEPARATION

// This component shouldnt care how we get/add data from/to the server
// This component shouldnt care about how to show a single ToDo (should be extracted to its own component)

function Todos() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    fetch('http://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data?.todos));
  }, []);

  const addTodo = async () => {
    const response = await fetch('http://dummyjson.com/todos/add', 'some todo');
    if (response.ok) {
      setTodos(currentTodos => [...currentTodos, response.todo]);
    }
  };

  return (
    <>
      <form onSubmit={addTodo}>
        <input placeholder='add todo' />
        <input type='submit' />
      </form>

      <ul>
        {todos.map(todo => {
          return (
            <p key={todo.id}>
              {todo.completed ? 'Completed' : 'Not completed'}
              {todo.todo}
            </p>
          );
        })}
      </ul>
    </>
  );
}

// SEPARATION OF CONCERNS
function Todos() {
  const { todos, addTodo } = useTodos();

  return (
    <>
      <form onSubmit={addTodo}>
        <input placeholder='add todo' />
        <input type='submit' />
      </form>

      <ul>
        {todos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
}

// TodoItem component
function TodoItem({ todo }) {
  return (
    <p>
      {todo.status}
      {todo.todo}
    </p>
  );
}

// Small data layer to create an abstraction for how we get/add data
class TodosApi {
  // Using TS this should be a private method
  static parseTodos(todos) {
    return todos.map(todo => {
      return {
        text: todo.todo,
        status: todo.completed ? 'Completed' : 'Not completed',
      };
    });
  }

  static getTodos() {
    return fetch('http://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        todos: this.parseTodos(data?.todos);
      });
  }

  static addTodo(todo) {
    return fetch('http://dummyjson.com/todos/add', {
      body: todo,
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        todo: data.todo;
      });
  }
}

// Reusable hook with the neccesary logic (we can use this hook in multiple components)
function useTodos() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    TodosApi.getTodos().then(todos => setTodos(todos));
  }, []);

  const addTodo = async todo => {
    const response = await TodosApi.addTodo(todo);
    if (response.ok) {
      setTodos(currentTodos => [...currentTodos, response.todo]);
    }
  };

  return { todos, addTodo };
}
