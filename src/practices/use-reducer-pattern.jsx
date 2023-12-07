import React from 'react';

// IS OKEY
function UserForm() {
  const [user, setUser] = React.useState({
    name: '',
    age: '',
    occupation: '',
  });

  function onInputChange(event) {
    const {
      target: { name, value },
    } = event;

    // You have to always spread prevState and you dont have control over
    // how state changes happen (no safe guard)
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  // Form
}

// IS BETTER
function reducer(current, update) {
  // You have more control over how your state changes
  if (update.age > 18) {
    return { ...current, ...update };
  }
  return initState;
}

function UserForm2() {
  const [user, setField] = React.useReducer(reducer, initState);

  function onInputChange(event) {
    const {
      target: { name, value },
    } = event;

    // useReducer lets you have a cleaner API
    // (no need to spread prevState on each event handler)
    setField({ [name]: value });
  }

  // Form
}
