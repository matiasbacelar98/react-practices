import React from 'react';

// Not a good idea
function App() {
  const [isLoading, setisLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [hasSucceded, setHasSucceded] = React.useState(false);

  // code ...
}

// BETTER (single source of truth)
const STATUS = {
  IDLE: 'IDLE',
  IS_LOADING: 'IS_LOADING',
  HAS_ERROR: 'HAS_ERROR',
  HAS_SUCCEDED: 'HAS_SUCCEDED',
};

function App2() {
  const [status, setStatus] = React.useState(STATUS.IDLE);
  // code ...
}
