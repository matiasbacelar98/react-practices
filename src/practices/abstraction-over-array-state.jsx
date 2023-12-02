import React from 'react';

export default function Todos() {
  const [todos, { add, remove }] = useArrayState([]);
  return <ul>{/* Some todos */}</ul>;
}

// Hook with state logic
function useArrayState(initialValue) {
  const [todos, setTodos] = React.useState(initialValue);

  function add(newValue) {
    setTodos(currentState => [...currentState, newValue]);
  }

  function remove() {
    setTodos(currentState => {
      const newState = [...currentState];
      newState.splice(index, 1);
      return newState;
    });
  }

  return [todos, { add, remove }];
}
