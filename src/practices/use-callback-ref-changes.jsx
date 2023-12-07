import React from 'react';

// Not ideal
function App() {
  const [height, setHeight] = React.useState(0);
  const elementRef = React.useRef(null);

  // An object ref doesnt notify about changes to the current value
  React.useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.offsetHeight);
    }
  }, [elementRef.current]);

  return <div ref={elementRef}></div>;
}

// Better
function App2() {
  const [height, setHeight] = React.useState(0);

  // React will call this function with a reference to the DOM
  // element when it mounts or null when it unmounts
  const elementRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  return <div ref={elementRef}></div>;
}
