// Avoid this
const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeContext.Provider>
    <UserContext.Provider>
      <QueryClient.Provider>
        <App />
      </QueryClient.Provider>
    </UserContext.Provider>
  </ThemeContext.Provider>
);

// BETTER IDEA (use composition) (is more complicated to understand)
function buildProvidersTree(componentsWithProps) {
  const initialComponent = ({ children }) => <>{children}</>;
  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
}

const ProvidersTree = buildProvidersTree([
  [ThemeContext.Provider],
  [UserContext.Provider],
  [QueryClient.Provider, { client: queryClient }],
]);

const root2 = createRoot(document.getElementById('root'));
root2.render(
  <ProvidersTree>
    <App />
  </ProvidersTree>
);
