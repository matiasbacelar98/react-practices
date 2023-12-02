import React from "react";
 
function ExpensiveComponent() {
  return <h1>Expensive component</h1>;
} 

// unnecessary re render 
export default function App() {
  const [background, setBackground] = React.useState("blue");

  function onChangeBackground(event) {
    setBackground(event.target.value);
  }

  return (
    <div>
      <input value={background} onChange={onChangeBackground} />
      <div style={{ background }}>Try changing the background!</div>

      <ExpensiveComponent />
    </div>
  );
}

// BETTER IDEA
export default function App() {
  const [background, setBackground] = React.useState("blue");

  function onChangeBackground(event) {
    setBackground(event.target.value);
  }

  return (
    <BackgroundPicker>
      <ExpensiveComponent />
    </BackgroundPicker>
  );
}

function BackgroundPicker({ children }) {
  const [background, setBackground] = React.useState("blue");

  function onChangeBackground(event) {
    setBackground(event.target.value);
  }

  return (
    <div>
      <input value={background} onChange={onChangeBackground} />
      <div style={{ background }}>Try changing the background!</div>

      {/* When BackgroundPicker RE-RENDER the children is the same so React wont re render it */}
      {{ children }}
    </div>
  );
}
