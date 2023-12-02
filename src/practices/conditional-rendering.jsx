import React from 'react';

// It works but is harder to read and mantain
function GoalLegend({ goal }) {
  return (
    <>
      {goal < 30
        ? 'There is still some work to do!'
        : goal >= 30 && goal < 60
        ? 'You are almost there!'
        : 'You reached your goal'}
    </>
  );
}

// BETTER
function GoalLegend2({ goal }) {
  return (
    <Switch>
      <Case condition={goal < 30}>There is still some work to do!</Case>
      <Case condition={goal >= 30 && goal < 60}>You are almost there!</Case>
      <Case condition={goal > 60}>You reached your goal</Case>
      <Default>Make sure to set a goal</Default>
    </Switch>
  );
}

function Switch({ children }) {
  let matchChild = null;
  let defaultCase = null;

  React.children.forEach(children, child => {
    if (!matchChild && child.type === Case) {
      const { condition } = child.props;
      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchChild = child;
      } else if (!defaultCase && child.type === Default) {
        defaultCase = child;
      }

      return matchChild ?? defaultCase ?? null;
    }
  });
}

function Case({ children }) {
  return <>{children}</>;
}

function Default({ children }) {
  return <>{children}</>;
}
