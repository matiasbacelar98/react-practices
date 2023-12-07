import React from 'react';

//** Bad
// Unnecessary useEffect and useState
function Checkout() {
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const newTotal = items.reduce((acc, currValue) => {
      return acc + currValue.price;
    }, 0);

    setTotal(newTotal);
  }, [items]);

  // UI
}

//** Good
// Perfom the calculation in render instead
function Checkout2() {
  const [items, setItems] = React.useState([]);

  // Computed propertie
  const newTotal = items.reduce((acc, currValue) => {
    return acc + currValue.price;
  }, 0);

  // UI
}

//** Good
// iF the calculation is expensive and you see performance issues, wrap the calculation with React.useMemo()
function Checkout3() {
  const [items, setItems] = React.useState([]);

  // Computed propertie
  const newTotal = React.useMemo(
    () =>
      items.reduce((acc, currValue) => {
        return acc + currValue.price;
      }, 0),
    [items]
  );

  // UI
}
