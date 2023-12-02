import React from 'react';

// No separation (UI/BUSINESS LOGIC)
function ItemPage() {
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`https://api.example.com/items/${item.id}`);
      setItem(res.json());
    };

    fetchItem();
  }, []);

  function onSubmit() {
    // ... ... ...
  }

  return (
    <Container>
      <Name>{item.name}</Name>

      {/* View shouldnt care how to calculate the price */}
      <Price>{item.discountPrice || item.price}</Price>

      <Button onClick={onSubmit}>Add to cart</Button>
    </Container>
  );
}

// Separate business logic from UI
function ItemPage() {
  const item = useItem(ID);

  function onSubmit() {
    // ... ... ...
  }

  return (
    <Container>
      <Name>{item.name}</Name>
      <Price>{item.price}</Price>
      <Button onClick={onSubmit}>Add to cart</Button>
    </Container>
  );
}

// Hook
function useItem(itemId) {
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    const fetchItem = async () => {
      const res = await ItemsApi.getItemById(itemId);
      setItem(res.json());
    };

    fetchItem();
  }, []);

  return { item };
}

// ItemsApi
class ItemsApi {
  // With TS this method should be private
  static parseItem(item) {
    return {
      name: item.name,
      price: item.discountPrice || item.price,
    };
  }

  static getItemById(itemId) {
    return fetch(`https://api.example.com/items/${itemId}`)
      .then(res => res.json())
      .then(data => this.parseItem(data.item));
  }
}
