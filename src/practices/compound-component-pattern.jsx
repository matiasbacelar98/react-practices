import React from 'react';

// Wrong implementation
function App() {
  return (
    <Dropdown
      items={['Item 1', 'Item 2']}
      text='Solutions'
      footerHeading='Documentations'
      footerDesc='Start Integrating product and tools'
      showIcons
      hasFooter
    />
  );
}

function Dropdown({ text, hasFooter, footerHeading, footerDesc, items }) {
  return (
    <>
      <button>{text}</button>
      <ul>
        {items.map(item => (
          <li>
            {showIcon && <SomeIcon />}
            {item}
          </li>
        ))}
      </ul>

      {hasFooter && (
        <div>
          <h2>{footerHeading}</h2>
          <p>{footerDesc}</p>
        </div>
      )}
    </>
  );
}

// BETTER
function App2() {
  return (
    <Dropdown>
      <Dropdown.Button>Solutions</Dropdown.Button>
      <Dropdown.List>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
      </Dropdown.List>
      <Dropdown.Footer>
        <h2>Documentations</h2>
        <p>Start Integrating product and tools</p>
      </Dropdown.Footer>
    </Dropdown>
  );
}

// Dropdown component (Compound pattern)

/*
Now the Dropdown component is CLOSED FOR MODIFICATION
as we dont need to change it in order to extend it,
in other words: it is OPEN FOR EXTENSION
*/

const DropdownContext = React.createContext();

function Dropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  return <DropdownContext.Provider>{children}</DropdownContext.Provider>;
}

function Button() {
  const { isOpen } = React.useContext(DropdownContext);

  return (
    <button onClick={() => setIsOpen(currState => !currState)}>
      {children} {isOpen ? '↑' : '↓'}
    </button>
  );
}

function List({ children }) {
  const { isOpen } = React.useContext(DropdownContext);
  return <>{isOpen ? <ul>{children}</ul> : null}</>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

function Footer({ children }) {
  return <div>{children}</div>;
}

Dropdown.Button = Button;
Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.Footer = Footer;
