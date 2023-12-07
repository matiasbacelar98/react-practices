import React from 'react';

//---------- Bad use case ----------//
function App() {
  // Button component is light, and re-rendering it doesnt create performance issues
  const onClick = React.useCallback(() => {
    // handle click event
  }, []);

  return <Button onClick={onClick}>Click me!</Button>;
}

function Button({ onClick }) {
  return <button onClick={onClick}>Click me!</button>;
}

//---------- Good use case ----------//
function App2() {
  // When App re-renders, onClick function remains the same and doesnt break the
  // memoization of "ExpensiveComponent"
  const onClick = React.useCallback(() => {
    // handle click event
  }, []);

  return <ExpensiveComponent onClick={onClick} />;
}

const ExpensiveComponent = React.memo(({ onClick }) => {
  /* */
});
