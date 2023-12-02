// It is not very readable
function App({ filter }) {
  if (filter.type === 'dates') {
    return <DateFilter />;
  } else if (filter.type === 'category') {
    return <CategoryFilter />;
  } else {
    return <NoFilter />;
  }
}

// Better (1)
function createFilter(filter) {
  switch (filter.type) {
    case 'dates':
      return <DateFilter />;
    case 'category':
      return <CategoryFilter />;
    default:
      return <NoFilter />;
  }
}

function App({ filter }) {
  return createFilter(filter);
}

// Better (2)
const filterFactories = {
  dates: DateFilter,
  category: CategoryFilter,
};

function App({ filter }) {
  return filterFactories[filter.type] ?? <NoFilter />;
}
