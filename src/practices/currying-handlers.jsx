import React from 'react';

export default function UserForm() {
  const [items, setItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const onItemClick = item => () => setSelectedItem(item);

  return (
    <ul>
      {items.map(item => {
        return <li onClick={() => onItemClick(item)}>{item}</li>;
      })}
    </ul>
  );
}
