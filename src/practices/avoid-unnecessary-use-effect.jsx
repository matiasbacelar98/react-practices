import React from 'react';

// BAD
function PlansSection() {
  const [plans, setPlans] = React.useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  React.useEffect(() => {
    fetch('/get/plans').then(response => {
      setPlans(response.data.plans);
    });
  }, []);

  // We dont need this useEffect to set the default plan
  // EXTRA: Children will be rendered twices
  React.useEffect(() => {
    const defaultPlan = plans.find(plan => plan.isDefault);
    setSelectedPlan(defaultPlan);
  }, [plans]);

  function onSelectPlan(plan) {
    setSelectedPlan(plan);
  }

  return (
    <ul>
      {plans?.map(plan => {
        return (
          <Plan
            key={plan.id}
            isSelected={plan.id === selectedPlan.id}
            onSelectedPlan={onSelectPlan}
            plan={plan}
          />
        );
      })}
    </ul>
  );
}

// BETTER
function PlansSection() {
  const [plans, setPlans] = React.useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  React.useEffect(() => {
    fetch('/get/plans').then(response => {
      setPlans(response.data.plans);
    });
  }, []);

  // React is gonna re render this component immediately after the return statement and
  // before rendering the children
  // THIS WAY CHILDREN DONT NEED TO RENDER TWICE
  if (selectedPlan === null) {
    const defaultPlan = plans.find(plan => plan.isDefault);
    setSelectedPlan(defaultPlan);
  }

  function onSelectPlan(plan) {
    setSelectedPlan(plan);
  }

  return (
    <ul>
      {plans?.map(plan => {
        return (
          <Plan
            key={plan.id}
            isSelected={plan.id === selectedPlan.id}
            onSelectedPlan={onSelectPlan}
            plan={plan}
          />
        );
      })}
    </ul>
  );
}
